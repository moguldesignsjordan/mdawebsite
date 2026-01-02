'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiUsers, FiTrendingUp } from 'react-icons/fi';
import InteractiveButton from '../../components/ui/InteractiveButton';
import AiServiceCard from '../../components/ai/AiServiceCard';
import CallToAction from '../../components/CallToAction';

const services = [
  {
    title: "Lead Generation",
    tags: ["AI Cold Email", "Application Systems", "Content Automation"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Project Management",
    tags: ["Auto-Fulfillment", "Onboarding Systems", "PM Systems"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Hiring Systems",
    tags: ["Intake Automations", "AI Scoring", "Trial Management"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Sales Administration",
    tags: ["Custom CRMs", "AI Asset Gen", "Nurture Systems"],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function AutomationsPage() {
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
            The definitive <br/>
            <span className="text-primary">AI Growth Partner</span> <br/>
            for fast-moving teams.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <InteractiveButton href="/contact" text="Book a Demo" />
          </motion.div>
        </div>

        {/* Decorative Blur */}
        <div className="absolute right-0 top-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      </section>

      {/* 2. IMPACT STATS */}
      <section className="container mx-auto px-4 mb-32">
        <div className="border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3">
              <span className="flex items-center gap-4 text-gray-500 font-heading font-bold tracking-widest uppercase mb-4 text-sm">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">1</span>
                The Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                Tens of millions generated. <span className="text-primary block">Hours saved per week.</span>
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-xl text-gray-400 leading-relaxed mb-12">
                You built your agency. We scale it. We use a proprietary, AI-driven consulting stack and a framework that dives deep into the heart of your business to fix real, practical problems—not just theoretical ones, but actual ways to drive revenue & growth.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h3 className="text-6xl font-bold text-white mb-2 font-heading">20+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Hours Saved / Employee</p>
                </div>
                <div>
                  <h3 className="text-6xl font-bold text-white mb-2 font-heading">10x</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">ROI in 90 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section id="services" className="container mx-auto px-4 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <span className="flex items-center gap-4 text-gray-500 font-heading font-bold tracking-widest uppercase mb-4 text-sm">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">2</span>
                Our Services
              </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">What we specialize in.</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AiServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TEAM SECTION ("AI-Natives") */}
      <section className="bg-[#111] py-24 mb-0 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <span className="flex items-center gap-4 text-gray-500 font-heading font-bold tracking-widest uppercase mb-4 text-sm">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">3</span>
                About Us
              </span>
              <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                AI-Natives since 2020.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                The Mogul leadership team was early to spot the business utility of generative AI. Well before ChatGPT became a household name, we were architecting custom LLM solutions for high-growth firms.
              </p>
              <InteractiveButton href="/contact" text="Meet the Team" />
            </div>
            
            <div className="md:w-1/2 grid grid-cols-1 gap-8">
               {/* Team Member 1 */}
               <div className="flex gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors">
                 <div className="w-20 h-20 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border border-white/10">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold font-heading text-white">Jordan Mogul</h4>
                   <p className="text-primary text-xs font-bold uppercase mb-3 tracking-wider">Founder / Strategy</p>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     An engineer and veteran systems architect, Jordan has worked with brands to install, scale, and optimize high-performance outreach & content systems.
                   </p>
                 </div>
               </div>
               
               {/* Team Member 2 */}
               <div className="flex gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors">
                 <div className="w-20 h-20 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border border-white/10">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Partner" className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h4 className="text-xl font-bold font-heading text-white">Sarah Jenkins</h4>
                   <p className="text-primary text-xs font-bold uppercase mb-3 tracking-wider">Operations / AI</p>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     Specializes in agent-based workflows and custom automation scripts that replace manual data entry with intelligent decision making.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <CallToAction />
    </div>
  );
}