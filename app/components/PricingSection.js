'use client';

import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const plans = [
  {
    name: "Starter",
    price: "299",
    description: "Starter branding package for your business/brand.",
    features: [
      "Logo Refresh/Design (Unlimited Concepts)",
      "Color palette + Type Pairing",
      "Brand Style Guide (PDF)",
      "Stationary Mockups",
      "Source Files (JPEG, PNG, PDF, AI)"
    ],
    link: "https://buy.stripe.com/28E6oH1so3Fw24Sb274F20W",
    popular: false
  },
  {
    name: "Pro",
    price: "499",
    description: "A complete brand system ready for marketing.",
    features: [
      "Primary Logo (Unlimited Concepts)",
      "Brand Guide (Usage, Spacing, Do/Don't)",
      "Social Kit (Templates + Covers)",
      "Business Card & Letterhead Files",
      "Priority Scheduling"
    ],
    link: "https://buy.stripe.com/8x24gz3Awcc2fVI7PV4F20X",
    popular: true // This triggers the orange border and badge
  },
  {
    name: "Elite",
    price: "2,499",
    description: "Enterprise polish with full rollout assets.",
    features: [
      "Logo System (Unlimited) + Marks Library",
      "Brand Book (40+ Pages, Print + Web)",
      "Launch Kit (Social, Deck, Stationery)",
      "Add-on: 1–3 Page Web Design (Optional)",
      "White-glove Process"
    ],
    link: "https://buy.stripe.com/6oU5kD3Aw6RI10O2vB4F20Y",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-dark text-white border-y border-white/5 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
              Design & Branding Packages
            </h2>
            <p className="text-gray-400 max-w-xl text-lg">
              Pick your sprint, pay securely, and we’ll kick off immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`
                relative flex flex-col p-8 rounded-3xl transition-all duration-300 group
                ${plan.popular 
                  ? 'bg-dark-card border-2 border-primary shadow-[0_0_30px_-10px_rgba(255,185,6,0.3)]' 
                  : 'bg-dark-card border border-white/10 hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl'
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-500 text-sm">/one-time</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-black transition-colors">
                      <FiCheck size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={plan.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`
                  w-full py-4 rounded-xl font-bold font-heading text-center transition-all duration-300
                  ${plan.popular 
                    ? 'bg-primary text-black hover:shadow-[0_10px_20px_rgba(255,185,6,0.4)] hover:-translate-y-1' 
                    : 'bg-white/5 text-white hover:bg-white hover:text-black'
                  }
                `}
              >
                Select {plan.name}
              </a>
              
              <p className="text-center text-gray-500 text-xs mt-4">
                {plan.popular ? "Priority scheduling included" : "3-5 day typical turnaround"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;