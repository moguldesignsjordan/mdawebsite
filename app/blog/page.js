import Link from 'next/link';

const posts = [
  { id: 1, title: "Why Automation is the Future of Agencies", date: "Jan 12, 2026", cat: "Automation" },
  { id: 2, title: "The 2026 Design Trends You Need to Know", date: "Jan 08, 2026", cat: "Design" },
  { id: 3, title: "How We Scaled Tax Moguls to 7 Figures", date: "Dec 22, 2025", cat: "Case Study" },
  { id: 4, title: "React vs. WordPress: Which is Right for You?", date: "Dec 15, 2025", cat: "Development" },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold font-heading mb-16 text-center">Insights</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Link key={post.id} href={`#`} className="group block">
              <div className="aspect-video bg-gray-800 rounded-2xl mb-6 overflow-hidden">
                {/* Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="text-primary font-bold uppercase tracking-wider">{post.cat}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-3xl font-bold font-heading group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}