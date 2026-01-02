'use client';

import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const plans = [
  {
    name: "Basic Web Brochure",
    price: "499",
    description: "A clean brochure site for fast credibility.",
    features: [
      "Custom design (Brochure site)",
      "Domain name setup included",
      "30 days FREE hosting",
      "Mobile-first layout",
      "Copy assist + On-brand components",
      "Analytics + Basic SEO",
      "Contact form + Spam protection"
    ],
    link: "https://buy.stripe.com/fZu6oHefa3FwcJw3zF4F20Z",
    popular: false
  },
  {
    name: "Site + CMS",
    price: "1,999",
    description: "Multi-page site with CMS/blog and speed best practices.",
    features: [
      "Up to 10–12 pages + CMS/Blog setup",
      "On-page SEO + Performance pass",
      "White-label integrations (Pixels, Analytics)",
      "Forms → White-label automations (Basic)",
      "Priority Scheduling",
      "CMS Training Session"
    ],
    link: "https://buy.stripe.com/5kQ14nc72dg69xk6LR4F210",
    popular: true // Triggers the orange styling
  },
  {
    name: "Ecommerce / App Shell",
    price: "3,499",
    description: "Shop or app-like experience with secure payments & data.",
    features: [
      "Product catalog, payments, tax rules",
      "Customer accounts + Email sequences",
      "Speed optimizations + QA + Staging",
      "Optional backend/API hooks (CRM/DB)",
      "White-glove build process"
    ],
    link: "#",
    popular: false
  }
];

const WebPricingSection = () => {
  return (
    <section className="py-24 bg-dark text-white border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-center w-full">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
              Web & Development Packages
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Pick your build, pay securely, and we’ll spin up your project right away.
            </p>
          </div>
        </div>

        {/* UPDATED: Removed 'items-start' to allow cards to stretch to equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              // UPDATED: Added 'h-full' and 'flex-col' to ensure full height and proper spacing
              className={`
                relative flex flex-col p-8 rounded-3xl transition-all duration-300 group h-full
                ${plan.popular 
                  ? 'bg-dark-card border-2 border-primary shadow-[0_0_30px_-10px_rgba(255,185,6,0.3)] z-10 scale-[1.02]' 
                  : 'bg-dark-card border border-white/10 hover:border-primary/50 hover:shadow-xl'
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

              {/* UPDATED: flex-grow ensures this section pushes the button to the bottom */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 border-t border-white/5 pt-3 first:border-0 first:pt-0">
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
                  w-full py-4 rounded-xl font-bold font-heading text-center transition-all duration-300 mt-auto
                  ${plan.popular 
                    ? 'bg-primary text-black hover:shadow-[0_10px_20px_rgba(255,185,6,0.4)] hover:-translate-y-1' 
                    : 'bg-white/5 text-white hover:bg-white hover:text-black'
                  }
                `}
              >
                Select {plan.name}
              </a>
              
              <p className="text-center text-gray-500 text-xs mt-4">
                {plan.popular ? "Typical turnaround 10–14 days" : "3–7 day turnaround"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebPricingSection;