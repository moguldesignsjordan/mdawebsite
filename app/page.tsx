import HeroSection from './components/HeroSection';
import LogoMarquee from './components/LogoMarquee';
import ServicesOverview from './components/ServicesOverview';
import ServicesConveyor from './components/ServicesConveyor';
import PortfolioSection from './components/PortfolioSection';
import Testimonials from './components/Testimonials';
import ComparisonSection from './components/ComparisonSection';
import CallToAction from './components/CallToAction';

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <ServicesOverview />
      <ServicesConveyor />
      <ComparisonSection />
      
      {/* Fixed the capitalization here */}
      <PortfolioSection />
      
      <Testimonials />
      <CallToAction />
    </>
  );
}