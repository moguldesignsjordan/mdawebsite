'use client';

import { motion } from 'framer-motion';

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

// Create reversed array without mutating original
const logosReversed = [...logos].reverse();

const LogoMarquee = () => {
  return (
    <section className="py-24 bg-dark-lighter overflow-hidden border-y border-white/5 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark pointer-events-none"></div>
      
      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/40 text-sm uppercase tracking-widest mb-4"
        >
          Trusted Partners
        </motion.p>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold font-heading text-white"
        >
          Trusted By Over <span className="text-gradient-gold">100+</span> Brands
        </motion.h3>
      </div>
      
      {/* First Marquee - Left to Right */}
      <div className="relative mb-8">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
          <motion.div
            className="flex gap-16 md:gap-24 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 group">
                <img 
                  src={logo} 
                  alt="Client Logo" 
                  className="h-16 md:h-24 w-auto object-contain opacity-30 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
                /> 
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Second Marquee - Right to Left */}
      <div className="relative">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
          <motion.div
            className="flex gap-16 md:gap-24 items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            }}
          >
            {[...logosReversed, ...logosReversed].map((logo, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 group">
                <img 
                  src={logo} 
                  alt="Client Logo" 
                  className="h-16 md:h-24 w-auto object-contain opacity-30 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
                /> 
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;