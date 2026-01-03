import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { client } from '@/sanity/lib/client';
import PortfolioGrid from './PortfolioGrid';

async function getProjects() {
  // Fetch top 4 projects
  const query = `*[_type == "project"] | order(publishedAt desc)[0..3] {
    "id": _id,
    title,
    "slug": slug.current,
    "category": techStack[0], 
    "imageUrl": mainImage.asset->url
  }`;
  
  // Return empty array if fetch fails
  const data = await client.fetch(query);
  return data || [];
}

export default async function PortfolioSection() {
  const projects = await getProjects();

  return (
    <section className="py-16 md:py-24 bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 whitespace-nowrap">
              {/* Updated Gradient to match brand color #ff9d14 */}
              Our Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9d14] to-[#ffb040]">Work</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              We build digital experiences that drive results.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
             <Link 
               href="/portfolio" 
               // Updated Hover Color to #ff9d14
               className="inline-flex items-center text-white font-bold hover:text-[#ff9d14] transition-colors text-xs md:text-sm uppercase tracking-wider group"
             >
                View All Projects 
                <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>

        {/* Passing the data safely */}
        <PortfolioGrid projects={projects} />

      </div>
    </section>
  );
}