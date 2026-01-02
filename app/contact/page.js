'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6">Let's Talk</h1>
            <p className="text-xl text-gray-400">
              Ready to start a project? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-400 mb-2">Service Interested In</label>
              <select className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition-colors">
                <option>Brand Identity</option>
                <option>Web Design</option>
                <option>Automation & AI</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-400 mb-2">Message</label>
              <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Tell us about your project..."></textarea>
            </div>

            <button type="submit" className="w-full bg-primary text-black font-bold font-heading text-lg py-4 rounded-xl hover:bg-white transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}