'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const categories = ["All", "Web Design", "Branding", "Automation", "App Development", "Project Management"];

export default function PortfolioFilter({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.projectType && p.projectType.includes(activeCategory));

  return (
    <div>
      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            // UPDATED: Active state now uses exact HEX [#ff9d14]
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-[#ff9d14] border-[#ff9d14] text-white shadow-lg shadow-[#ff9d14]/20 scale-105"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href={`/portfolio/${project.slug}`} 
                // UPDATED: Hover border color match
                className="group relative block h-full bg-[#161616] rounded-3xl overflow-hidden border border-white/5 hover:border-[#ff9d14]/50 transition-all duration-500 shadow-xl"
              >
                
                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[16/10] overflow-hidden">
                   {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">No Image</div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-90" />

                  {/* CATEGORY BADGES */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.projectType && project.projectType.slice(0, 3).map((type, i) => (
                      <span 
                        key={i} 
                        className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-wider"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="absolute bottom-0 left-0 w-full p-8 pt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      {/* UPDATED: Title hover color match */}
                      <h3 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-[#ff9d14] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base line-clamp-2 max-w-md">
                        {project.tagline}
                      </p>
                    </div>
                    
                    {/* UPDATED: Arrow icon background and border match */}
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-[#ff9d14] group-hover:border-[#ff9d14] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                      <FiArrowUpRight className="text-xl text-white" />
                    </div>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE */}
      {filteredProjects.length === 0 && (
        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
          <p className="text-gray-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}