'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["All", "Web Design", "Branding", "Automation", "App Development", "Project Management"];

export default function PortfolioFilter({ projects }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.projectType === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center md:justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat
                ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/20"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href={`/portfolio/${project.slug}`} 
                className="group relative block bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                   {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">No Image</div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                      {project.projectType || 'Project'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No projects found in this category yet.
        </div>
      )}
    </div>
  );
}