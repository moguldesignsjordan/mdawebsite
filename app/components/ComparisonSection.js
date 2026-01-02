'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiX, FiUsers, FiBriefcase, FiCpu, FiLayers } from 'react-icons/fi';

const features = ["Speed", "Flexibility", "Quality", "Scalability", "Cost-effective"];

const competitors = [
  {
    name: "In-house team",
    desc: "Slow hiring process, fixed overheads, and limited skill sets.",
    icon: <FiUsers size={24} />,
    values: [false, false, true, false, false] // X, X, Check, X, X
  },
  {
    name: "Traditional Agencies",
    desc: "High quality but often slow, rigid, and very expensive.",
    icon: <FiBriefcase size={24} />,
    values: [false, false, true, false, false]
  },
  {
    name: "Freelancers",
    desc: "Flexible but unreliable quality and hard to scale up.",
    icon: <FiLayers size={24} />,
    values: [true, true, false, false, true]
  }
];

const ComparisonSection = () => {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            The Mogul Advantage
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stop compromising. See how we stack up against the old ways of doing business.
          </p>
        </div>

        {/* Scrollable Container for Mobile */}
        <div className="overflow-x-auto pb-8 -mx-4 px-4 md:overflow-visible">
          <div className="min-w-[800px]">
            
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-4 mb-6 text-center">
              <div className="col-span-1"></div> {/* Empty space for labels */}
              {features.map((feature, i) => (
                <div key={i} className="text-lg font-bold font-heading text-gray-300">
                  {feature}
                </div>
              ))}
            </div>

            {/* --- MOGUL ROW (Highlighted) --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-6 gap-4 items-center bg-primary text-black p-6 rounded-3xl mb-8 shadow-[0_0_50px_-12px_rgba(255,162,0,0.3)] transform transition-transform hover:scale-[1.01]"
            >
              <div className="col-span-1 text-left pl-4">
                <h3 className="text-2xl font-bold font-heading mb-1">Mogul</h3>
                <p className="text-sm font-medium opacity-80 leading-tight">
                  Top 1% talent + AI Automation systems.
                </p>
              </div>
              {/* Mogul gets all checks */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <FiCheck size={20} className="text-black stroke-[3px]" />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* --- COMPETITOR ROWS --- */}
            <div className="space-y-4">
              {competitors.map((comp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-6 gap-4 items-center p-6 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-2xl transition-colors"
                >
                  <div className="col-span-1 text-left flex items-start gap-4">
                    <div className="mt-1 text-gray-500 hidden md:block">
                      {comp.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-heading text-white">{comp.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[180px]">
                        {comp.desc}
                      </p>
                    </div>
                  </div>

                  {comp.values.map((isTrue, i) => (
                    <div key={i} className="flex justify-center">
                      {isTrue ? (
                        <FiCheck size={24} className="text-white opacity-50" />
                      ) : (
                        <FiX size={24} className="text-gray-600" />
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;