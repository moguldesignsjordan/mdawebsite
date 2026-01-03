import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

// MOVE CONFIG INSIDE THE FUNCTION
// This prevents the "Top Level" crash during build

export async function POST(request) {
  try {
    // 1. Initialize Client INSIDE the request
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

    // 3. Parse JSON from Make/n8n
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
        
        // Upload to Sanity
        const asset = await serverClient.assets.upload('image', buffer, {
          filename: `automation-${Date.now()}.jpg`,
        });
        imageAssetId = asset._id;
      } else {
        console.warn('Failed to download image from URL provided');
      }
    }

    // 5. Generate Slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // 6. Create Post
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
      body: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: content }],
          style: 'normal'
        }
      ]
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