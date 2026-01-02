'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: "brand",
    title: "Brand",
    subtitle: "Identity",
    tags: ["Logo Design", "Brand Development", "Guidelines"],
    link: "/services/design",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/10/ChatGPT-Image-Oct-9-2025-11_44_59-PM.png"
  },
  {
    id: "development",
    title: "Developer",
    subtitle: "Strategy",
    tags: ["Architecture", "APIs", "Automation"],
    link: "/services/automations",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/08/uzIoL8SRyELk2Bn2nPrSfmZVSrYkhUnpijD4ddCn.webp"
  },
  {
    id: "website",
    title: "Website",
    subtitle: "Design",
    tags: ["Landing Pages", "eCommerce", "Custom UI"],
    link: "/services/web-design",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/08/67e05442bc20675ff4d61cf8_CREDITGURU.webp"
  },
  {
    id: "ai",
    title: "Artificial",
    subtitle: "Intelligence",
    tags: ["LLMs", "Machine Learning", "Generative AI"],
    link: "/services/automations",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/08/kPsIilzVfHnXYslF1Z9Eniz30LWg8ymiVXBrANdk.webp"
  },
  {
    id: "social",
    title: "Social",
    subtitle: "Creative",
    tags: ["Social Ads", "Management", "Automation"],
    link: "/contact",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/10/2222.png"
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "Strategy",
    tags: ["Ad Campaigns", "Video Posts", "Reels"],
    link: "/services/design",
    bg: "https://moguldesignagency.com/wp-content/uploads/2025/10/indoor-shot-confident-cheerful-young-dark-skinned-female-freelancer-sitting-dining-table-working-remotely-using-portable-computer-modern-electronic-gadgets-job-occupation-concept-scaled.jpg"
  }
];

const ServicesConveyor = () => {
  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
         <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
           
         </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Added min-w-max to ensure it doesn't collapse */}
        <motion.div 
          className="flex gap-8 w-max min-w-full px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40 
          }}
        >
          {/* Loop twice for seamless infinite scroll */}
          {[...services, ...services].map((item, index) => (
            <Link 
              key={`${item.id}-${index}`} 
              href={item.link}
              // Fixed dimensions to ensure visibility
              className="group relative block w-[280px] h-[380px] md:w-[320px] md:h-[450px] shrink-0 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 bg-gray-900"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.bg})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <h3 className="text-3xl font-bold font-heading text-white leading-tight drop-shadow-md">
                  {item.title} 
                  <span className="block text-gray-300 font-sans text-xl italic font-normal mt-1">
                    {item.subtitle}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="bg-black/60 backdrop-blur-md text-xs text-white px-3 py-1 rounded-full border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesConveyor;