'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const InteractiveButton = ({ href, text = "Let's Talk", variant = "primary" }) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (magnetic pull)
      const distanceX = (e.clientX - centerX) * 0.3;
      const distanceY = (e.clientY - centerY) * 0.3;
      
      mouseX.set(distanceX);
      mouseY.set(distanceY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.div
      ref={buttonRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      <Link
        href={href}
        className={`
          group relative inline-flex items-center justify-between overflow-hidden
          rounded-full transition-all duration-500
          ${isPrimary 
            ? 'bg-white text-black h-14 px-2 pl-7' 
            : 'bg-transparent text-white h-14 px-2 pl-7 border border-white/20 hover:border-white/40'
          }
        `}
      >
        {/* Background fill animation */}
        <motion.div
          className={`absolute inset-0 ${isPrimary ? 'bg-primary' : 'bg-white'}`}
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '0%' : '-100%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />

        {/* Text Container with split animation */}
        <span className="relative z-10 flex items-center gap-4">
          <span className="relative h-6 overflow-hidden">
            {/* Default text */}
            <motion.span
              className={`block text-base font-bold font-heading tracking-wide ${
                isPrimary 
                  ? 'group-hover:text-black' 
                  : 'group-hover:text-black'
              }`}
              animate={{ y: isHovered ? '-100%' : '0%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {text}
            </motion.span>
            
            {/* Hover text */}
            <motion.span
              className={`absolute top-full left-0 block text-base font-bold font-heading tracking-wide ${
                isPrimary ? 'text-black' : 'text-black'
              }`}
              animate={{ y: isHovered ? '-100%' : '0%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {text}
            </motion.span>
          </span>
        </span>

        {/* Icon Circle */}
        <motion.span
          className={`
            relative z-10 w-10 h-10 rounded-full flex items-center justify-center ml-4
            transition-colors duration-300
            ${isPrimary 
              ? 'bg-black text-white group-hover:bg-black' 
              : 'bg-white/10 text-white group-hover:bg-black group-hover:text-white'
            }
          `}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <FiArrowUpRight size={18} />
        </motion.span>
      </Link>

      {/* Glow effect */}
      <motion.div
        className={`
          absolute -inset-1 rounded-full blur-xl opacity-0 -z-10
          ${isPrimary ? 'bg-primary' : 'bg-white'}
        `}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default InteractiveButton;
