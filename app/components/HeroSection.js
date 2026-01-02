'use client';

import { motion } from 'framer-motion';
import InteractiveButton from './ui/InteractiveButton'; // Import new button

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark text-white">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-dark pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-heading"
        >
          Design + Automation For <br className="hidden md:block" /> High-velocity Teams
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
        >
          One-stop solution for businesses seeking to enhance their brand presence or their operational efficiency.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          {/* NEW BUTTON COMPONENT */}
          <InteractiveButton href="/contact" text="Start A Project" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;