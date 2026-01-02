'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceCard = ({ title, description, link }) => {
  return (
    <motion.div
      variants={item}
      className="bg-dark-card p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group bg-[#1a1a1a]"
    >
      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors font-heading">{title}</h3>
      <p className="text-gray-400 mb-8 line-clamp-3">{description}</p>
      <Link href={link || '#'} className="inline-flex items-center text-primary font-bold hover:underline">
        See more <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;