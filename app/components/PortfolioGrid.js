'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// FIX: Added "projects = []" to handle cases where data is missing/loading
export default function PortfolioGrid({ projects = [] }) {
  
  // Safety check: If projects is still somehow null, return nothing
  if (!projects || projects.length === 0) {
    return null; 
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id || index} // Fallback key if ID is missing
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-2xl"
        >
          <Link href={`/portfolio/${project.slug}`}>
            {/* Card Image */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#161616] border border-white/5">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-orange-600 text-white px-5 py-2 text-sm rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                  View Project
                </span>
              </div>
            </div>

            {/* Card Text */}
            <div className="mt-4">
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-orange-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                {project.category || 'Development'}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}