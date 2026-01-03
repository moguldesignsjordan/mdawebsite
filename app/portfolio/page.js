export const revalidate = 60;

import { client } from '@/sanity/lib/client';
import PortfolioFilter from '../components/PortfolioFilter';

async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    tagline,
    projectType, 
    "imageUrl": mainImage.asset->url
  }`;
  return client.fetch(query);
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="relative bg-black min-h-screen text-white pt-32 pb-20 overflow-hidden">
      
      {/* GLOW: Updated to use your exact #ff9d14 color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ff9d14]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          {/* Label: Exact Color Match */}
          <p className="text-[#ff9d14] font-bold tracking-widest uppercase text-xs md:text-sm mb-4">
            Our Portfolio
          </p>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9d14] to-[#ffb040]">Work</span>
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
            We don't just build websites; we build digital ecosystems. Explore our recent case studies in branding, development, and automation.
          </p>
        </div>

        {/* The Client Component handles the Filtering & Grid */}
        <PortfolioFilter projects={projects} />

      </div>
    </div>
  );
}