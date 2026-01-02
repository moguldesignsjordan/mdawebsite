'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: "brand",
    title: "Brand",
    subtitle: "Identity",
    tags: ["Logo Design", "Brand Development", "Guidelines"],
    link: "/services/design",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-9-2025-11_44_59-PM.png",
    color: "from-orange-500/30",
  },
  {
    id: "development",
    title: "Developer",
    subtitle: "Strategy",
    tags: ["Architecture", "APIs", "Automation"],
    link: "/services/automations",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/08/uzIoL8SRyELk2Bn2nPrSfmZVSrYkhUnpijD4ddCn.webp",
    color: "from-blue-500/30",
  },
  {
    id: "website",
    title: "Website",
    subtitle: "Design",
    tags: ["Landing Pages", "eCommerce", "Custom UI"],
    link: "/services/web-design",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/08/67e05442bc20675ff4d61cf8_CREDITGURU.webp",
    color: "from-purple-500/30",
  },
  {
    id: "ai",
    title: "Artificial",
    subtitle: "Intelligence",
    tags: ["LLMs", "Machine Learning", "Generative AI"],
    link: "/services/automations",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/08/kPsIilzVfHnXYslF1Z9Eniz30LWg8ymiVXBrANdk.webp",
    color: "from-cyan-500/30",
  },
  {
    id: "social",
    title: "Social",
    subtitle: "Creative",
    tags: ["Social Ads", "Management", "Automation"],
    link: "/contact",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/10/2222.png",
    color: "from-pink-500/30",
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "Strategy",
    tags: ["Ad Campaigns", "Video Posts", "Reels"],
    link: "/services/design",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/10/indoor-shot-confident-cheerful-young-dark-skinned-female-freelancer-sitting-dining-table-working-remotely-using-portable-computer-modern-electronic-gadgets-job-occupation-concept-scaled.jpg",
    color: "from-green-500/30",
  }
];

const ServiceConveyorCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative block w-[300px] h-[420px] md:w-[340px] md:h-[480px] shrink-0"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={item.link}>
        <motion.div
          className="w-full h-full rounded-3xl overflow-hidden relative bg-[#111] border border-white/5"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            borderColor: isHovered ? 'rgba(255, 162, 0, 0.3)' : 'rgba(255, 255, 255, 0.05)',
            boxShadow: isHovered 
              ? '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 0 60px -20px rgba(255, 162, 0, 0.3)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.bg})` }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          />

          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
            {/* Top content */}
            <div>
              <motion.h3
                className="text-3xl md:text-4xl font-bold font-heading text-white leading-tight"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
                <span className="block text-white/60 font-sans text-xl md:text-2xl italic font-normal mt-1">
                  {item.subtitle}
                </span>
              </motion.h3>
            </div>

            {/* Tags at bottom */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {item.tags.map((tag, idx) => (
                <motion.span
                  key={idx}
                  className="bg-black/60 backdrop-blur-md text-xs text-white px-4 py-2 rounded-full border border-white/10 hover:border-primary/30 hover:bg-primary/20 transition-all cursor-pointer"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

const ServicesConveyor = () => {
  return (
    <section className="py-24 bg-dark overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 md:gap-8 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 40,
          }}
        >
          {/* Double the items for seamless loop */}
          {[...services, ...services].map((item, index) => (
            <ServiceConveyorCard key={`${item.id}-${index}`} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesConveyor;
