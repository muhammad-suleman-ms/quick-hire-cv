import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import TemplatesSection from "@/components/home/templates-section";
import BuilderSection from "@/components/home/builder-section";
import PricingSection from "@/components/home/pricing-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import FaqSection from "@/components/home/faq-section";
import CtaSection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <BuilderSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
