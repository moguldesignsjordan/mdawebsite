export const revalidate = 60;

import Link from 'next/link';
import { client } from '@/sanity/lib/client';

async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    title,
    slug,
    tagline,
    "imageUrl": mainImage.asset->url
  }`;
  return client.fetch(query);
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-4">
            Selected Work
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Portfolio</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            A collection of digital experiences, branding, and automation systems we've built.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              href={`/portfolio/${project.slug.current}`} 
              key={project.slug.current}
              className="group relative block bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">No Image</div>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Case Study
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 line-clamp-2">
                  {project.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Work in Progress</h3>
            <p className="text-gray-400">Projects coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}