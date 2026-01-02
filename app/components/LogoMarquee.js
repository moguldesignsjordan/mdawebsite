'use client';

import { motion } from 'framer-motion';

// Using placeholders for now - ensure these paths match your actual files in public/images/
// or replace with external URLs as you had before.
const logos = [
  'https://moguldesignagency.com/wp-content/uploads/2025/10/3.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/MBBEAUTY-e1760286455867.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/JJ.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/KF-e1760286823118.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/SBB.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/77.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/lyfestyle1-scaled.png',
  'https://moguldesignagency.com/wp-content/uploads/2025/10/wcm-scaled.png',
];

const LogoMarquee = () => {
  return (
    <section className="py-24 bg-dark-lighter overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-4 mb-16 text-center">
        {/* Updated Title: Larger, Capitalized, and using your Heading Font */}
        <h3 className="text-3xl md:text-5xl font-bold font-heading text-white">
          Trusted By Over 100+ Brands
        </h3>
      </div>
      
      <div className="flex overflow-hidden relative w-full">
        <motion.div
          className="flex gap-16 md:gap-32 items-center w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40, // Slower speed feels more premium with large logos
            ease: "linear",
          }}
        >
          {/* We repeat the logos twice to create a seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 relative group">
               <img 
                 src={logo} 
                 alt="Client Logo" 
                 // Increased height: h-20 (80px) on mobile, h-32 (128px) on desktop
                 className="h-20 md:h-32 w-auto object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
               /> 
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;