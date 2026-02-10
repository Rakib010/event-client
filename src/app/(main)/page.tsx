import { HeroSection } from "@/components/modules/Home/HeroSection";
import { CategoriesSection } from "@/components/modules/Home/EventCategories";
import { HowItWorksSection } from "@/components/modules/Home/HowItWorks";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
import { EventsSection } from "@/components/modules/Home/EventSection";
import { WhyChooseUs } from "@/components/modules/Home/WhyChooseUs";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <EventsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <WhyChooseUs />
    </div>
  );
}

export default HomePage;
