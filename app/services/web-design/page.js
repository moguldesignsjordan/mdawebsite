'use client';

import { motion } from 'framer-motion';
import { 
  FiLayout, FiSmartphone, FiZap, FiCode, 
  FiShoppingCart, FiDatabase, FiSearch, FiSettings 
} from 'react-icons/fi';

// Imports for reusable components
import InteractiveButton from '../../components/ui/InteractiveButton';
import CallToAction from '../../components/CallToAction';
import WebPricingSection from '../../components/WebPricingSection'; // NEW IMPORT

// --- Web Services Data with Bento Layout Config ---
const webServices = [
  {
    title: "Custom Development",
    desc: "Bespoke websites built on React and Next.js for unmatched speed and scalability.",
    tags: ["Next.js", "React", "Scalable Arch"],
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-2", // Large Square
    icon: <FiCode className="w-6 h-6" />
  },
  {
    title: "High-Performance CMS",
    desc: "Headless CMS integrations (Sanity, Contentful) for easy content management.",
    tags: ["Sanity", "Contentful"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1", // Standard
    icon: <FiDatabase className="w-6 h-6" />
  },
  {
    title: "eCommerce",
    desc: "Custom storefronts designed to maximize average order value.",
    tags: ["Shopify", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1", // Standard
    icon: <FiShoppingCart className="w-6 h-6" />
  },
  {
    title: "Motion & 3D",
    desc: "Award-winning animations using Framer Motion and Three.js.",
    tags: ["Three.js", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1", // Standard
    icon: <FiZap className="w-6 h-6" />
  },
  {
    title: "SEO & Performance",
    desc: "Technical SEO ensuring 99+ Google Lighthouse scores.",
    tags: ["Core Vitals", "Speed"],
    image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1", // Standard
    icon: <FiSearch className="w-6 h-6" />
  },
  {
    title: "Responsive Design",
    desc: "Pixel-perfect experiences across all devices, from 4K monitors to mobile phones.",
    tags: ["Mobile First", "Adaptive"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-1", // Wide
    icon: <FiSmartphone className="w-6 h-6" />
  },
  {
    title: "Landing Pages",
    desc: "High-velocity landing page systems designed for rapid A/B testing.",
    tags: ["CRO", "High Velocity"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1", // Standard
    icon: <FiLayout className="w-6 h-6" />
  },
  {
    title: "Maintenance & Ops",
    desc: "Ongoing support, security updates, and feature rollouts.",
    tags: ["Security", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1", // Standard
    icon: <FiSettings className="w-6 h-6" />
  }
];

export default function WebDesignPage() {
  return (
    <div className="bg-dark min-h-screen text-white pt-48">
      
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 mb-32 relative z-10">
        <div className="max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-8xl font-bold font-heading mb-10 leading-[1.1] tracking-tight"
          >
            Websites that <br/>
            <span className="text-primary">look expensive</span> <br/>
            but sell harder.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          >
            We don't build digital brochures. We build high-performance revenue engines using the latest tech stack (Next.js) to ensure you outrank and outperform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-6"
          >
            <InteractiveButton href="/contact" text="Start Project" variant="primary" />
            <InteractiveButton href="#pricing" text="View Pricing" variant="outline" />
          </motion.div>
        </div>

        {/* Decorative Blur */}
        <div className="absolute right-0 top-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      </section>

      {/* 2. IMPACT STATS - Performance */}
      <section className="container mx-auto px-4 mb-32">
        <div className="border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3">
              <span className="flex items-center gap-4 text-gray-500 font-heading font-bold tracking-widest uppercase mb-4 text-sm">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">1</span>
                Performance
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                Speed isn't a feature. <span className="text-primary block">It's a requirement.</span>
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-xl text-gray-400 leading-relaxed mb-12">
                Every second of load time costs you 7% in conversions. Our sites are built on modern frameworks that load instantly, rank higher on Google, and keep users engaged.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h3 className="text-6xl font-bold text-white mb-2 font-heading">99+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Google PageSpeed Score</p>
                </div>
                <div>
                  <h3 className="text-6xl font-bold text-white mb-2 font-heading">0.5s</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Average Load Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID - Full Services */}
      <section id="work" className="container mx-auto px-4 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <span className="flex items-center gap-4 text-gray-500 font-heading font-bold tracking-widest uppercase mb-4 text-sm">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">2</span>
                Capabilities
              </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">Comprehensive Web Solutions</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
          {webServices.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 ${item.className}`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-4">
                    {item.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
                    {item.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. NEW PRICING SECTION */}
      <div id="pricing" className="mb-0">
        <WebPricingSection />
      </div>

      {/* 5. CTA */}
      <CallToAction />
    </div>
  );
}