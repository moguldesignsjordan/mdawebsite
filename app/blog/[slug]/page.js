export const revalidate = 60;

import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// -----------------------------------------------------------------------------
// 1. HELPER: Calculate Reading Time
// -----------------------------------------------------------------------------
function getReadingTime(text) {
  const wordsPerMinute = 200;
  let textContent = '';
  
  if (typeof text === 'string') {
    textContent = text;
  } else if (Array.isArray(text)) {
    textContent = text.map(block => 
      block.children ? block.children.map(child => child.text).join('') : ''
    ).join(' ');
  }

  const noOfWords = textContent.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

// -----------------------------------------------------------------------------
// 2. DATA FETCHING
// -----------------------------------------------------------------------------
async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body,
    contentHtml
  }`;
  
  return client.fetch(query, { slug });
}

// -----------------------------------------------------------------------------
// 3. DYNAMIC METADATA (SEO)
// -----------------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Mogul Design`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [{ url: post.mainImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

// -----------------------------------------------------------------------------
// 4. PORTABLE TEXT STYLING (The Fix for H1/H2)
// -----------------------------------------------------------------------------
const myPortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight">{children}</h1>,
    // Updated: Text and Border Color
    h2: ({children}) => <h2 className="text-3xl font-bold text-[#ff9d14] mt-10 mb-5 border-l-4 border-[#ff9d14] pl-4">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>,
    h4: ({children}) => <h4 className="text-xl font-bold text-white mt-6 mb-3">{children}</h4>,
    normal: ({children}) => <p className="mb-6 text-gray-300 leading-relaxed text-lg">{children}</p>,
    // Updated: Blockquote Border Color
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-[#ff9d14] pl-4 italic text-gray-400 my-8 bg-white/5 p-6 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Updated: Bullet/Number Marker Color
    bullet: ({children}) => <ul className="list-disc ml-6 mb-6 text-gray-300 space-y-2 marker:text-[#ff9d14]">{children}</ul>,
    number: ({children}) => <ol className="list-decimal ml-6 mb-6 text-gray-300 space-y-2 marker:text-[#ff9d14]">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          // Updated: Link Text, Hover, and Decoration Color
          className="text-[#ff9d14] hover:text-[#ffb040] underline decoration-[#ff9d14]/30 underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
  },
};


// -----------------------------------------------------------------------------
// 5. MAIN COMPONENT
// -----------------------------------------------------------------------------
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Determine content source for reading time
  const contentSource = post.body || post.contentHtml || '';
  const readingTime = getReadingTime(contentSource);

  return (
    // Updated: Selection Colors
    <article className="bg-[#0f0f0f] min-h-screen text-white pt-24 pb-20 selection:bg-[#ff9d14]/30 selection:text-[#ffb040]">
      
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 max-w-4xl mb-8">
        <Link 
          href="/blog" 
          // Updated: Hover Color
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-[#ff9d14] transition-colors group"
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Articles
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <header className="mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            {/* Updated: Tag Background, Text, and Border */}
            <span className="bg-[#ff9d14]/10 text-[#ff9d14] px-3 py-1 rounded-full font-medium border border-[#ff9d14]/20">
              Blog Post
            </span>
            <span className="text-gray-400 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-gray-400 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src={post.mainImage} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
        </header>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto">
          {post.contentHtml && !post.body && (
             <div 
               // Updated: Anchor Text Color in Prose
               className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-[#ff9d14] prose-img:rounded-xl"
               dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
             />
          )}

          {post.body && (
            <div className="prose-lg max-w-none">
              <PortableText 
                value={post.body} 
                components={myPortableTextComponents} 
              />
            </div>
          )}
        </div>

        {/* Footer / CTA Section */}
        <hr className="my-16 border-white/10" />
        
        <div className="text-center pb-12">
          <p className="text-gray-400 mb-6">Did you find this article helpful?</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/contact" 
              // Updated: Button Background, Hover, and Shadow
              className="px-8 py-3 bg-[#ff9d14] hover:bg-[#e08a11] text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-[#ff9d14]/20"
            >
              Work With Us
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}