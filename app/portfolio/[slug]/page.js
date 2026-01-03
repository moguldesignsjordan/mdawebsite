export const revalidate = 60;

import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Styling for text blocks (Updated to use #ff9d14)
const myPortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-bold text-[#ff9d14] mt-10 mb-4">{children}</h2>,
    normal: ({children}) => <p className="mb-6 text-gray-300 leading-relaxed">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-[#ff9d14] pl-4 italic text-gray-400 my-8">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc ml-5 mb-6 text-gray-300 marker:text-[#ff9d14] space-y-2">{children}</ul>,
  },
};

async function getProject(slug) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title, tagline, client, timeline, role, techStack, projectLink,
    "imageUrl": mainImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    body
  }`;
  return client.fetch(query, { slug });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    // Updated selection color
    <article className="bg-[#0f0f0f] min-h-screen text-white pt-28 pb-20 selection:bg-[#ff9d14]/30">
      
      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-4 max-w-7xl mb-16">
        {/* Updated hover color */}
        <Link href="/portfolio" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#ff9d14] mb-8 transition-colors">
          ← Back to Work
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{project.title}</h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">{project.tagline}</p>
      </div>

      {/* 2. MAIN IMAGE (Full Width Container) */}
      {project.imageUrl && (
        <div className="w-full h-[50vh] md:h-[70vh] relative mb-20 overflow-hidden">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-80 h-32 bottom-0 top-auto" />
        </div>
      )}

      {/* 3. CONTENT GRID */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Sticky Metadata Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-8 bg-[#161616] p-8 rounded-2xl border border-white/5">
            {project.client && (
              <div>
                {/* Updated text color */}
                <h3 className="text-xs font-bold text-[#ff9d14] uppercase tracking-widest mb-1">Client</h3>
                <p className="text-lg font-medium">{project.client}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-6">
              {project.timeline && (
                <div>
                   {/* Updated text color */}
                  <h3 className="text-xs font-bold text-[#ff9d14] uppercase tracking-widest mb-1">Timeline</h3>
                  <p className="text-lg font-medium">{project.timeline}</p>
                </div>
              )}
              {project.role && (
                <div>
                   {/* Updated text color */}
                  <h3 className="text-xs font-bold text-[#ff9d14] uppercase tracking-widest mb-1">Role</h3>
                  <p className="text-lg font-medium">{project.role}</p>
                </div>
              )}
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div>
                 {/* Updated text color */}
                <h3 className="text-xs font-bold text-[#ff9d14] uppercase tracking-widest mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.projectLink && (
              <a 
                href={project.projectLink} 
                target="_blank" 
                rel="noopener noreferrer"
                // Updated Button: Background, Hover, and Shadow match brand color
                className="flex items-center justify-center w-full bg-[#ff9d14] hover:bg-[#e08a11] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-[#ff9d14]/20 mt-4"
              >
                Visit Live Site ↗
              </a>
            )}
          </aside>

          {/* RIGHT: Case Study & Gallery */}
          <div className="lg:col-span-8">
            
            {/* Portable Text Content */}
            {project.body && (
              <div className="prose prose-invert prose-lg max-w-none mb-20">
                <PortableText value={project.body} components={myPortableTextComponents} />
              </div>
            )}

            {/* Gallery Grid */}
            {project.galleryUrls && project.galleryUrls.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Project Gallery</h3>
                <div className="grid grid-cols-1 gap-8">
                  {project.galleryUrls.map((url, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                      <img 
                        src={url} 
                        alt={`Gallery image ${index + 1}`} 
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </article>
  );
}