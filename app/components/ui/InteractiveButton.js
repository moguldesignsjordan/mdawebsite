'use client';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

const InteractiveButton = ({ href, text = "Let's Talk" }) => {
  return (
    <Link href={href} className="group relative inline-flex items-center justify-between bg-white text-black rounded-full h-14 px-2 pl-6 overflow-hidden transition-all duration-500 hover:w-auto w-fit gap-4">
      
      {/* Sliding Text Container */}
      <div className="relative h-6 overflow-hidden flex flex-col justify-start text-lg font-bold font-heading">
        <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)] block">
          {text}
        </span>
        <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)] block text-primary">
          {text}
        </span>
      </div>

      {/* Sliding Icon Circle */}
      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center relative overflow-hidden">
        <FiArrowUpRight className="absolute transition-all duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)] group-hover:translate-x-full group-hover:-translate-y-full" size={20} />
        <FiArrowUpRight className="absolute transition-all duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)] -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-primary" size={20} />
      </div>
    </Link>
  );
};

export default InteractiveButton;