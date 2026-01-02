import Head from 'next/head';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import ServicesOverview from '@/components/ServicesOverview';
import ServicesConveyor from '@/components/ServicesConveyor';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mogul Design Agency - Design & Automation</title>
        <meta name="description" content="Full-service digital agency specializing in design, automation, and web development for high-velocity teams." />
      </Head>
      
      <HeroSection />
      <LogoMarquee />
      <ServicesOverview />
      <ServicesConveyor />
      
      {/* Placeholder for Portfolio Section */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Our Most Recent Projects</h2>
        <p className="text-gray-400">Portfolio grid coming soon...</p>
      </section>
    </>
  );
}