import Hero             from "@/components/landing/Hero";
import TrustBar         from "@/components/landing/TrustBar";
import HowItWorks       from "@/components/landing/HowItWorks";
import FeatureHighlight from "@/components/landing/FeatureHighlight";
import CTABanner        from "@/components/landing/CTABanner";
import Footer           from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeatureHighlight />
      <CTABanner />
      <Footer />
    </>
  );
}
