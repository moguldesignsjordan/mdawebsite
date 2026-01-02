'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: "Credit Guru 101",
    category: "Web Design",
    image: "/",
    link: "/projects/credit-guru"
  },
  {
    id: 2,
    title: "Tax Moguls",
    category: "Software Development",
    image: "/", 
    link: "/projects/tax-moguls"
  },
  {
    id: 3,
    title: "Harden Made LLC",
    category: "Branding & Web",
    image: "/",
    link: "/projects/harden-made"
  },
  {
    id: 4,
    title: "PreApproval Academy",
    category: "Education Platform",
    image: "/",
    link: "/projects/preapproval"
  }
];

const PortfolioSection = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-lighter text-white">
      <div className="container mx-auto px-4">
        {/* FIX: Changed 'items-end' to 'items-start md:items-end' 
           This ensures text aligns left on mobile (preventing bad breaks) 
           and right on desktop.
        */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            {/* FIX: Added whitespace-nowrap to prevent line breaks on the title */}
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 whitespace-nowrap">
              Selected Work
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base">
              We build digital experiences that drive results.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
             <Link href="/projects" className="inline-flex items-center text-primary font-bold hover:underline text-xs md:text-sm uppercase tracking-wider">
                View All Projects <FiArrowRight className="ml-2" />
             </Link>
          </div>
        </div>

        {/* FIX: Grid updated to 'grid-cols-4' on large screens for smaller cards.
           'sm:grid-cols-2' ensures they aren't too huge on tablets.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link href={project.link}>
                {/* FIX: Aspect Ratio 'aspect-[4/3]' creates a nice compact card. 
                   You can change to 'aspect-video' for even shorter cards.
                */}
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-800">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 text-xs rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-base md:text-lg font-bold font-heading group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-xs text-gray-500">{project.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;