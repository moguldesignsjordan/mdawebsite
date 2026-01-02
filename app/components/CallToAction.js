'use client';

import { motion } from 'framer-motion';
import InteractiveButton from './ui/InteractiveButton'; // Import new button

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/mda.webp" 
          alt="CTA Background" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 2. Existing Glow Effects */}
      <div className="absolute inset-0 bg-primary/10 z-0 mix-blend-overlay"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold font-heading text-white mb-6"
        >
          Ready to Scale Your Brand?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white mb-10 max-w-2xl mx-auto"
        >
          Stop wasting time on manual tasks and outdated designs. Let's build something exceptional together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          {/* NEW BUTTON COMPONENT */}
          <InteractiveButton href="/contact" text="Start Your Project" />
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;