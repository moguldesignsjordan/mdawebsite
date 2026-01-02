'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiCheck, FiArrowRight, FiZap } from 'react-icons/fi';

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
    popular: false,
    turnaround: "3-5 day turnaround",
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
    popular: true,
    turnaround: "Priority scheduling included",
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
    popular: false,
    turnaround: "10-14 day turnaround",
  }
];

const PricingCard = ({ plan, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const spotlightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      className={`
        relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500
        ${plan.popular 
          ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-2 border-primary/50 shadow-2xl shadow-primary/10 scale-[1.02] z-10' 
          : 'bg-[#0f0f0f] border border-white/5 hover:border-white/10'
        }
      `}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(circle 300px at ${x}% ${y}%, ${plan.popular ? 'rgba(255, 162, 0, 0.1)' : 'rgba(255, 255, 255, 0.03)'} 0%, transparent 100%)`
          ),
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-primary py-2">
          <div className="flex items-center justify-center gap-2 text-black text-sm font-bold">
            <FiZap size={14} />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      <div className={`relative z-10 p-8 flex flex-col h-full ${plan.popular ? 'pt-14' : ''}`}>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold font-heading text-white mb-2">{plan.name}</h3>
          <p className="text-white/40 text-sm h-10 leading-relaxed">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-white/40 text-lg">$</span>
            <span className="text-5xl font-bold text-white font-heading">{plan.price}</span>
          </div>
          <span className="text-white/30 text-sm">one-time payment</span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3 text-sm text-white/70"
            >
              <span className={`
                w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                ${plan.popular 
                  ? 'bg-primary text-black' 
                  : 'bg-white/10 text-white/50'
                }
              `}>
                <FiCheck size={12} strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href={plan.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            relative w-full py-4 rounded-xl font-bold font-heading text-center overflow-hidden group
            ${plan.popular 
              ? 'bg-primary text-black' 
              : 'bg-white/5 text-white border border-white/10 hover:border-white/20'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button shimmer */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6 }}
          />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            Select {plan.name}
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </span>
        </motion.a>

        {/* Turnaround time */}
        <p className="text-center text-white/30 text-xs mt-4">
          {plan.turnaround}
        </p>
      </div>

      {/* Corner accents for popular plan */}
      {plan.popular && (
        <>
          <div className="absolute top-12 left-0 w-20 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          <div className="absolute top-12 right-0 w-20 h-px bg-gradient-to-l from-primary/50 to-transparent" />
        </>
      )}
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section className="py-32 bg-dark text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Transparent Pricing
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Design & Branding{' '}
            <span className="text-gradient-animate">Packages</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Pick your sprint, pay securely, and we'll kick off immediately. No hidden fees.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Fast Turnaround</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
