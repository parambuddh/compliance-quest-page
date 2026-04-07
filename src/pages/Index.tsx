import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";

// Lazy load below-the-fold sections for better performance
const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/SolutionSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const WhyComplianceVistaSection = lazy(() => import("@/components/WhyComplianceVistaSection"));
const UseCasesSection = lazy(() => import("@/components/UseCasesSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection"));

// Loading fallback component
const SectionSkeleton = () => (
  <div className="min-h-[400px] bg-gradient-to-b from-background to-background/50 animate-pulse" />
);

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <ProblemSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <SolutionSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WhyComplianceVistaSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <UseCasesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FinalCTASection />
      </Suspense>
    </main>
    <FooterSection />
  </>
);

export default Index;
