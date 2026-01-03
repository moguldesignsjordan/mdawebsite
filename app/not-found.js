'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0f0f0f] flex items-center justify-center overflow-hidden text-white selection:bg-orange-500/30">
      
      {/* Background Grid Pattern (Subtle Technical Feel) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        
        {/* Animated 404 Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[150px] md:text-[250px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 select-none"
        >
          4
          <span className="text-orange-600 inline-block animate-pulse">0</span>
          4
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest">
            System Failure
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
            The page you are looking for has been moved, deleted, or never existed in this dimension.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all shadow-lg shadow-orange-900/20 hover:scale-105"
            >
              Return Home
            </Link>
            <Link 
              href="/portfolio"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:border-orange-500/50 text-white font-bold rounded-full transition-all hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Code Elements */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-600 font-mono hidden md:block">
        ERROR_CODE: PAGE_NOT_FOUND<br/>
        STATUS: 404<br/>
        INITIATOR: USER_REQUEST
      </div>

    </div>
  );
}