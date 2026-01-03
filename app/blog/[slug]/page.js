import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

// Fetch a single post based on the URL slug
async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body
  }`;
  
  return client.fetch(query, { slug });
}

export default async function BlogPost({ params }) {
  const { slug } = await params; // Next.js 15+ requirement
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-dark min-h-screen text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          {post.mainImage && (
            <img 
              src={post.mainImage} 
              alt={post.title} 
              className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl"
            />
          )}
        </header>

        {/* Content Body */}
        <div className="prose prose-invert prose-lg max-w-none prose-a:text-primary hover:prose-a:text-primary/80">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}