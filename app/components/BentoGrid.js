'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const services = [
  {
    title: "Brand Identity",
    desc: "Complete visual systems that communicate value instantly.",
    className: "md:col-span-2 md:row-span-2", // Large square tile
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    link: "/contact"
  },
  {
    title: "Web Design",
    desc: "High-performance websites built to convert.",
    className: "md:col-span-1 md:row-span-2", // Tall tile
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop",
    link: "/contact"
  },
  {
    title: "Ad Creative",
    desc: "High-converting static & video ads.",
    className: "md:col-span-1 md:row-span-1", // Standard tile
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
    link: "/contact"
  },
  {
    title: "Social Media",
    desc: "On-brand content that drives engagement.",
    className: "md:col-span-1 md:row-span-1",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    link: "/contact"
  },
  {
    title: "Presentation Design",
    desc: "Pitch decks that close deals.",
    className: "md:col-span-2 md:row-span-1", // Wide tile
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
    link: "/contact"
  },
  {
    title: "Motion Design",
    desc: "Animations that bring your brand to life.",
    className: "md:col-span-2 md:row-span-1", // Wide tile
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    link: "/contact"
  }
];

const BentoGrid = () => {
  return (
    <section className="py-24 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Comprehensive <span className="text-primary">Creative Capabilities</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to scale your brand, beautifully organized and ready to deploy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors ${item.className}`}
            >
              <Link href={item.link} className="block w-full h-full">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:bg-black/80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold font-heading mb-2 text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-[90%]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <FiArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;