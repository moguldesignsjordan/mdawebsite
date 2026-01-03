import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';
import { markdownToBlocks } from '@tryfabric/martian';
import { randomUUID } from 'crypto'; // Built-in Node tool for generating keys

export async function POST(request) {
  try {
    // 1. Initialize Client
    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });
    
    // 2. Security Check
    const MY_SECRET_KEY = process.env.MY_WEBHOOK_SECRET;
    const authHeader = request.headers.get('authorization');
    
    if (authHeader !== `Bearer ${MY_SECRET_KEY}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Parse JSON
    const body = await request.json();
    const { title, excerpt, content, imageUrl } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Missing title or content' }, { status: 400 });
    }

    // 4. Handle Image URL (Download -> Upload to Sanity)
    let imageAssetId = null;
    if (imageUrl) {
      console.log(`Downloading image from: ${imageUrl}`);
      const imageRes = await fetch(imageUrl);
      if (imageRes.ok) {
        const imageBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);
        const asset = await serverClient.assets.upload('image', buffer, {
          filename: `automation-${Date.now()}.jpg`,
        });
        imageAssetId = asset._id;
      }
    }

    // 5. Generate Slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 96);

    // 6. Convert Markdown to Blocks & ADD KEYS (The Fix!)
    let portableTextContent = markdownToBlocks(content);

    // FIX A: Remove the first block if it's an H1 (removes the Double Title)
    if (portableTextContent.length > 0 && 
        portableTextContent[0].style === 'h1') {
      portableTextContent.shift(); // Remove the first item
    }

    // FIX B: Add unique keys to every block (Fixes the Sanity Warning)
    portableTextContent = portableTextContent.map(block => ({
      ...block,
      _key: randomUUID() // Generates a unique ID like "a1b2-c3d4"
    }));

    // 7. Create Post
    const newPost = await serverClient.create({
      _type: 'post',
      title: title,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      excerpt: excerpt,
      mainImage: imageAssetId ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId }
      } : undefined,
      
      // Save the clean, keyed blocks
      body: portableTextContent,
    });

    return NextResponse.json({ 
      success: true, 
      id: newPost._id, 
      url: `/blog/${slug}` 
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}