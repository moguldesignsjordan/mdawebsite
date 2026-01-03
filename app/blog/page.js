export const revalidate = 60;

import Link from 'next/link';
import { client } from '@/sanity/lib/client';

// Fetch data directly from Sanity
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt
  }`;
  
  return client.fetch(query);
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  // Separate the newest post (Featured) from the rest
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-32 pb-20 selection:bg-orange-500/30 selection:text-orange-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-4">
            Our Latest Thinking
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">News</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Deep dives into design, automation, and the future of technology. 
            Stay ahead of the curve with our latest articles.
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            {/* --- FEATURED POST (First Item) --- */}
            {featuredPost && (
              <div className="mb-20">
                <Link 
                  href={`/blog/${featuredPost.slug.current}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-orange-500/50 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-2xl">
                    {featuredPost.mainImage ? (
                      <img 
                        src={featuredPost.mainImage} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/20">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:pr-8">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-orange-500 transition-colors">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-300 text-lg mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <span className="inline-flex items-center text-orange-500 font-bold group-hover:translate-x-2 transition-transform duration-300">
                      Read Article 
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* --- STANDARD GRID (Remaining Items) --- */}
            {remainingPosts.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold">Recent Articles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post) => (
                    <Link 
                      href={`/blog/${post.slug.current}`} 
                      key={post.slug.current}
                      className="group flex flex-col bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-900/10"
                    >
                      {/* Image */}
                      <div className="h-56 overflow-hidden relative">
                        {post.mainImage ? (
                          <img 
                            src={post.mainImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-3">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        
                        <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-orange-500 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex items-center text-sm font-medium text-white group-hover:text-orange-400 transition-colors">
                          Read More
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // --- EMPTY STATE ---
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 text-white/50">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No articles yet</h3>
            <p className="text-gray-400">Run your automation to publish your first post!</p>
          </div>
        )}
      </div>
    </div>
  );
}