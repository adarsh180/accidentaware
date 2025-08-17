import { Hero } from '@/components/sections/hero';
import { Dashboard } from '@/components/sections/dashboard';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Testimonials } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="w-full space-y-8">
      <Hero />
      
      <Dashboard />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
