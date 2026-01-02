'use client';

const AiServiceCard = ({ title, tags, image }) => {
  return (
    <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Default Dark Overlay (Fades out on hover) */}
      <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:opacity-0" />
      
      {/* Content Layer */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3 className="text-3xl font-bold font-heading text-white mb-4 transition-colors duration-300 group-hover:text-white drop-shadow-md">
          {title}
        </h3>
        
        {/* Tags Container (Always visible but styled nicely) */}
        <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {tags.map((tag, i) => (
            <span key={i} className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-sm text-white font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiServiceCard;