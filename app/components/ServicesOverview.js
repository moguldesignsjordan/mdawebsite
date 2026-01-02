'use client';

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Brand Identity',
    description: 'We ensure your brands identity resonates with your audience and reflects your core values.',
    link: '/services/design',
  },
  {
    title: 'Systems & Automations',
    description: 'Client dashboards, AI chatbots, and systems built to scale.',
    link: '/services/automations',
  },
  {
    title: 'Web Design',
    description: 'Guaranteed quality results we work until its perfect.',
    link: '/services/web-design',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ServicesOverview = () => {
  return (
    <section className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading">Full Scale Digital Marketing Agency</h2>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;