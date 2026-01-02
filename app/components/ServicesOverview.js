'use client';

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Brand Identity',
    description: 'We ensure your brands identity resonates with your audience and reflects your core values. From logo design to comprehensive brand guidelines.',
    link: '/services/design',
  },
  {
    title: 'Systems & Automations',
    description: 'Client dashboards, AI chatbots, and intelligent systems built to scale your operations and eliminate manual work.',
    link: '/services/automations',
  },
  {
    title: 'Web Design',
    description: 'Guaranteed quality results with pixel-perfect execution. We work until its perfect, delivering sites that convert.',
    link: '/services/web-design',
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-32 bg-dark text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Services
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            Full Scale Digital{' '}
            <span className="relative">
              <span className="relative z-10">Marketing</span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </span>{' '}
            Agency
          </h2>
          
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Everything you need to grow your business, from brand identity to intelligent automation systems.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/40 text-sm">
            Need something custom?{' '}
            <a
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Let's discuss your project →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
