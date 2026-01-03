export const revalidate = 60;

import { client } from '@/sanity/lib/client';
import PortfolioFilter from '@/components/PortfolioFilter';

async function getProjects() {
  // Fetch data including the new 'projectType'
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
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12">
          <p className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-4">
            Our Work
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Projects</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            A collection of digital experiences, branding, and automation systems we've built.
          </p>
        </div>

        {/* The Client Component handles the Filtering & Grid */}
        <PortfolioFilter projects={projects} />

      </div>
    </div>
  );
}