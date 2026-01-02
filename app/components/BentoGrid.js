'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const services = [
  {
    title: "Brand Identity",
    desc: "Complete visual systems that communicate value instantly.",
    className: "md:col-span-2 md:row-span-2",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    link: "/contact",
    accent: "from-orange-500/20",
    featured: true,
  },
  {
    title: "Web Design",
    desc: "High-performance websites built to convert.",
    className: "md:col-span-1 md:row-span-2",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop",
    link: "/contact",
    accent: "from-blue-500/20",
  },
  {
    title: "Ad Creative",
    desc: "High-converting static & video ads.",
    className: "md:col-span-1 md:row-span-1",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
    link: "/contact",
    accent: "from-purple-500/20",
  },
  {
    title: "Social Media",
    desc: "On-brand content that drives engagement.",
    className: "md:col-span-1 md:row-span-1",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    link: "/contact",
    accent: "from-pink-500/20",
  },
  {
    title: "Presentation Design",
    desc: "Pitch decks that close deals.",
    className: "md:col-span-2 md:row-span-1",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
    link: "/contact",
    accent: "from-green-500/20",
  },
  {
    title: "Motion Design",
    desc: "Animations that bring your brand to life.",
    className: "md:col-span-2 md:row-span-1",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    link: "/contact",
    accent: "from-cyan-500/20",
    hasVideo: true,
  },
];

const BentoCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const spotlightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      className={`group relative rounded-3xl overflow-hidden ${item.className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
    >
      <Link href={item.link} className="block w-full h-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        
        {/* Accent gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255,255,255,0.1) 0%, transparent 100%)`
            ),
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/20 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          {/* Video play button for motion design */}
          {item.hasVideo && (
            <motion.div
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              <FiPlay className="text-white ml-0.5" size={18} />
            </motion.div>
          )}

          {/* Featured badge */}
          {item.featured && (
            <motion.div
              className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Featured</span>
            </motion.div>
          )}

          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <motion.h3
                className="text-xl md:text-2xl font-bold font-heading mb-2 text-white"
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-white/60 text-sm md:text-base line-clamp-2 max-w-[90%]"
                initial={{ opacity: 0.6, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                {item.desc}
              </motion.p>
            </div>

            {/* Arrow button */}
            <motion.div
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0,
                rotate: isHovered ? 0 : -45,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 162, 0, 0.3)' }}
            >
              <FiArrowRight size={18} />
            </motion.div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: isHovered ? '200%' : '-100%', opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          }}
        />
      </Link>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            What We Do
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Comprehensive{' '}
            <span className="relative">
              <span className="relative z-10">Creative</span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>{' '}
            Capabilities
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Everything you need to scale your brand, beautifully organized and ready to deploy.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {services.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
