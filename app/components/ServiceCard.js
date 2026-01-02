'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ title, description, link, index = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring animation for smooth tilt
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

  // Gradient position for spotlight effect
  const gradientX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const gradientY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      style={{
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative p-8 rounded-3xl border border-white/5 bg-[#0a0a0a] overflow-hidden transition-colors duration-500 hover:border-primary/30"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Spotlight gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 162, 0, 0.15) 0%, transparent 50%)`
            ),
          }}
        />

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255, 162, 0, 0.2)',
          }}
        />

        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {/* Number badge */}
          <motion.div
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 text-sm font-bold mb-6 border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500"
            whileHover={{ scale: 1.1 }}
          >
            0{index + 1}
          </motion.div>

          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 font-heading">
            {title}
          </h3>
          
          <p className="text-white/50 mb-8 line-clamp-3 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
            {description}
          </p>

          <Link
            href={link || '#'}
            className="inline-flex items-center gap-2 text-primary font-bold group/link"
          >
            <span className="relative">
              See more
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover/link:w-full transition-all duration-300" />
            </span>
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiArrowRight size={16} />
            </motion.span>
          </Link>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent transform translate-x-[-12px]" />
          <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-primary/50 to-transparent transform translate-y-[12px]" />
        </div>
      </motion.div>

      {/* Outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? '0 30px 60px -15px rgba(255, 162, 0, 0.15), 0 0 40px -20px rgba(255, 162, 0, 0.2)'
            : '0 0 0 0 transparent',
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ServiceCard;
