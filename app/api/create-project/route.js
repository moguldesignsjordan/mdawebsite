import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';
import { markdownToPortableText } from '@portabletext/markdown';
import { randomUUID } from 'crypto';

export async function POST(request) {
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    const formData = await request.formData();
    
    // Security
    if (formData.get('password') !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Invalid Password' }, { status: 401 });
    }

    // 1. Extract Basic Fields
    const title = formData.get('title');
    const tagline = formData.get('tagline');
    const clientName = formData.get('client');
    const timeline = formData.get('timeline');
    const role = formData.get('role');
    const projectLink = formData.get('projectLink');
    const markdownBody = formData.get('body');
    const techStackString = formData.get('techStack'); // Expecting comma-separated string

    // 2. Upload Main Image
    const imageFile = formData.get('image');
    let imageAssetId = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const asset = await client.assets.upload('image', buffer, { filename: imageFile.name });
      imageAssetId = asset._id;
    }

    // 3. Upload Gallery Images (Loop)
    const galleryFiles = formData.getAll('gallery');
    let galleryAssets = [];
    
    if (galleryFiles && galleryFiles.length > 0) {
      // Upload all images in parallel
      const uploadPromises = galleryFiles.map(async (file) => {
        if (file.size === 0) return null;
        const buffer = Buffer.from(await file.arrayBuffer());
        const asset = await client.assets.upload('image', buffer, { filename: file.name });
        return {
          _type: 'image',
          _key: randomUUID(),
          asset: { _type: 'reference', _ref: asset._id }
        };
      });
      
      const results = await Promise.all(uploadPromises);
      galleryAssets = results.filter(Boolean); // Remove any failed/empty uploads
    }

    // 4. Process Content
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 96);
    
    let portableTextBody = [];
    if (markdownBody) {
      portableTextBody = await markdownToPortableText(markdownBody);
      portableTextBody = portableTextBody.map(block => ({ ...block, _key: randomUUID() }));
    }

    // 5. Create Document
    const newProject = await client.create({
      _type: 'project',
      title,
      slug: { _type: 'slug', current: slug },
      tagline,
      client: clientName,
      timeline,
      role,
      techStack: techStackString ? techStackString.split(',').map(t => t.trim()) : [],
      projectLink,
      publishedAt: new Date().toISOString(),
      mainImage: imageAssetId ? { _type: 'image', asset: { _type: 'reference', _ref: imageAssetId } } : undefined,
      gallery: galleryAssets,
      body: portableTextBody,
    });

    return NextResponse.json({ success: true, id: newProject._id });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}