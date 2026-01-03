import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';
import { markdownToPortableText } from '@portabletext/markdown';
import { randomUUID } from 'crypto';

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

    // 6. Convert Markdown to Sanity Portable Text
    // We use the official library to ensure valid '_type' and 'style'
    let portableTextContent = await markdownToPortableText(content);

    // 7. Sanitize Blocks (Add Keys & Remove Duplicate Title)
    portableTextContent = portableTextContent
      // Remove the first block if it's an H1 (to avoid double titles)
      .filter((block, index) => !(index === 0 && block.style === 'h1'))
      // Ensure every block has a unique _key (Required by Sanity)
      .map(block => ({
        ...block,
        _key: block._key || randomUUID()
      }));

    // 8. Create Post
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
      body: portableTextContent, // Save the valid Portable Text
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