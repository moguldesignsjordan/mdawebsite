'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    name: "Justin Mason",
    role: "CEO, Tax Moguls",
    text: "Mogul Design Agency completely transformed our backend. The automation systems they built saved us 20+ hours a week. Their attention to detail and understanding of our business needs was exceptional.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Founder, Glow Beauty",
    text: "The branding package was exactly what we needed. They captured our vibe perfectly and the web design is flawless. We've seen a 40% increase in conversions since launch.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Marcus Reid",
    role: "Director, TechFlow",
    text: "Fast, reliable, and incredibly talented. The team understood our vision immediately and executed it with precision. They're now our go-to for all design work.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "CMO, NexGen AI",
    text: "Working with Mogul was a game-changer. Their AI-powered automation solutions helped us scale our marketing efforts by 3x while reducing manual work.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

// Custom Quote Icon component
const QuoteIcon = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
  </svg>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const navigate = (dir) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      if (dir === 1) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <QuoteIcon className="text-primary" size={14} />
            <span className="text-sm text-white/60">Client Testimonials</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">
            Don't Just Take{' '}
            <span className="text-gradient-animate">Our Word</span>{' '}
            For It
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            See what our high-velocity partners are saying about working with us.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <div className="bg-gradient-to-br from-white/[0.03] to-transparent p-10 md:p-14 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                  {/* Quote decoration */}
                  <QuoteIcon className="absolute top-8 right-8 text-primary/10 transform rotate-180" size={80} />

                  {/* Stars */}
                  <div className="flex gap-1 text-primary mb-8">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FiStar fill="currentColor" size={20} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10 font-light">
                    "{testimonials[activeIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-dark">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-dark" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg font-heading">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-primary/80 text-sm font-medium">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* Prev button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="relative w-10 h-2 rounded-full overflow-hidden bg-white/10 transition-all"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={false}
                    animate={{
                      scaleX: index === activeIndex ? 1 : 0,
                      originX: 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>

            {/* Next button */}
            <motion.button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronRight size={20} />
            </motion.button>
          </div>

          {/* Progress bar */}
          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary/50"
                key={activeIndex}
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? undefined : '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;