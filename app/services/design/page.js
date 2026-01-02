'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  // Icons for Creative Services
  FiSmartphone, FiLayout, FiMonitor, FiPenTool, 
  FiBookOpen, FiGlobe, FiVideo, FiPackage,
  // Icons for AI Section
  FiCpu, FiZap, FiCheckCircle
} from 'react-icons/fi';

// Updated Component Imports
import InteractiveButton from '../../components/ui/InteractiveButton'; // NEW BUTTON IMPORT
import PricingSection from '../../components/PricingSection';
import CallToAction from '../../components/CallToAction';
import BentoGrid from '../../components/BentoGrid'; 

// --- Restored Creative Services Data ---
const creativeServices = [
  {
    title: "Ad Creative",
    desc: "High-converting static and video ads for Facebook, Instagram, LinkedIn, and TikTok.",
    icon: <FiSmartphone className="w-6 h-6" />
  },
  {
    title: "Social Media Assets",
    desc: "On-brand carousels, stories, and feed posts that drive engagement and growth.",
    icon: <FiLayout className="w-6 h-6" />
  },
  {
    title: "Presentation Design",
    desc: "Pitch decks and sales presentations that tell a compelling story and close deals.",
    icon: <FiMonitor className="w-6 h-6" />
  },
  {
    title: "Brand Identity",
    desc: "Complete visual identity systems: logos, typography, color palettes, and guidelines.",
    icon: <FiPenTool className="w-6 h-6" />
  },
  {
    title: "eBooks & Reports",
    desc: "Turn complex data into beautiful, readable digital assets and lead magnets.",
    icon: <FiBookOpen className="w-6 h-6" />
  },
  {
    title: "Web Design",
    desc: "UI/UX design for websites and landing pages optimized for conversion.",
    icon: <FiGlobe className="w-6 h-6" />
  },
  {
    title: "Motion Design",
    desc: "Animated logos, UI interactions, and explainer videos to bring your brand to life.",
    icon: <FiVideo className="w-6 h-6" />
  },
  {
    title: "Packaging & Merch",
    desc: "Print-ready designs for physical products, swag, and unboxing experiences.",
    icon: <FiPackage className="w-6 h-6" />
  }
];

export default function DesignPage() {
  return (
    // PADDING FIX: pt-48 ensures content is well below the navbar
    <div className="bg-dark min-h-screen text-white pt-48">
      
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 mb-32 text-center relative z-10">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
            Plug a Fully-Managed <br className="hidden md:block" />
            <span className="text-primary">Design Team</span> into Your Workflow
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            From captivating brand identities to high-converting ad creatives, get world-class design at the speed of your ambition.
          </p>
          
          {/* UPDATED BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <InteractiveButton href="/contact" text="Book a Demo" variant="primary" />
          </div>
        </motion.div>
      </section>

      {/* 3. CREATIVE SERVICES GRID */}
      <section className="container mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Comprehensive Creative Solutions
          </h2>
          <p className="text-gray-400">Everything you need to scale your brand, under one roof.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeServices.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-primary/50 hover:bg-[#151515] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. AI & TECH SECTION */}
      <section className="py-24 bg-dark-lighter border-y border-white/5 mb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-6 border border-primary/20">
                <FiZap /> Our Technology
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Powered by Tech, <br /><span className="text-gray-500">Driven by Creativity.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We leverage the latest design tools and AI to streamline production, ensure consistency, and deliver higher quality work in less time.
              </p>
              
              <ul className="space-y-4">
                {[
                  "AI-Enhanced Asset Generation",
                  "Automated Brand Consistency Checks",
                  "Cloud-Based Collaboration Portals",
                  "Real-Time Project Tracking"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <FiCheckCircle className="text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-800 to-black relative group">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                        <FiCpu className="text-6xl text-primary mx-auto mb-4" />
                        <p className="text-center font-bold font-heading">High-Velocity Engine</p>
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. BENTO GRID (Visual Highlights) */}
      <div className="mb-32">
        <BentoGrid />
      </div>

      {/* 6. PRICING */}
      <div id="pricing" className="mb-0">
        <PricingSection />
      </div>

      {/* 7. CTA */}
      <CallToAction />
    </div>
  );
}