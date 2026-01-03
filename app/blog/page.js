import Link from 'next/link';
import { client } from '@/sanity/lib/client'; // Correct path based on your screenshot

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

  return (
    <div className="bg-dark min-h-screen text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Latest <span className="text-primary">Insights</span>
        </h1>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                href={`/blog/${post.slug.current}`} 
                key={post.slug.current}
                className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300"
              >
                {/* Image */}
                {post.mainImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.mainImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm line-clamp-3">
                    {post.excerpt || "Click to read more about this topic..."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/50">No posts found. Go to /studio to create one!</p>
        )}
      </div>
    </div>
  );
}