'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: "Justin Mason",
    role: "CEO, Tax Moguls",
    text: "Mogul Design Agency completely transformed our backend. The automation systems they built saved us 20+ hours a week.",
    image: "https://randomuser.me/api/portraits/men/32.jpg" // Placeholder or use real client photo
  },
  {
    name: "Sarah Jenkins",
    role: "Founder, Glow Beauty",
    text: "The branding package was exactly what we needed. They captured our vibe perfectly and the web design is flawless.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Marcus Reid",
    role: "Director, TechFlow",
    text: "Fast, reliable, and incredibly talented. The team understood our vision immediately and executed it with precision.",
    image: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-dark border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-gray-400">See what our high-velocity partners are saying.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-dark p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors relative"
            >
              {/* Stars */}
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">"{item.text}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading">{item.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;