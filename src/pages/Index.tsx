import { Suspense, lazy, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";

// Lazy load below-the-fold sections for better performance
const ProblemSection = lazy(() => 
  import("@/components/ProblemSection").catch(err => {
    console.error("Failed to load ProblemSection:", err);
    throw err;
  })
);
const SolutionSection = lazy(() => 
  import("@/components/SolutionSection").catch(err => {
    console.error("Failed to load SolutionSection:", err);
    throw err;
  })
);
const FeaturesSection = lazy(() => 
  import("@/components/FeaturesSection").catch(err => {
    console.error("Failed to load FeaturesSection:", err);
    throw err;
  })
);
const WhyComplianceVistaSection = lazy(() => 
  import("@/components/WhyComplianceVistaSection").catch(err => {
    console.error("Failed to load WhyComplianceVistaSection:", err);
    throw err;
  })
);
const UseCasesSection = lazy(() => 
  import("@/components/UseCasesSection").catch(err => {
    console.error("Failed to load UseCasesSection:", err);
    throw err;
  })
);
const FAQSection = lazy(() => 
  import("@/components/FAQSection").catch(err => {
    console.error("Failed to load FAQSection:", err);
    throw err;
  })
);
const ContactSection = lazy(() => 
  import("@/components/ContactSection").catch(err => {
    console.error("Failed to load ContactSection:", err);
    throw err;
  })
);
const FinalCTASection = lazy(() => 
  import("@/components/FinalCTASection").catch(err => {
    console.error("Failed to load FinalCTASection:", err);
    throw err;
  })
);

// Loading fallback component
const SectionSkeleton = () => (
  <div className="min-h-[400px] bg-gradient-to-b from-background to-background/50 animate-pulse" />
);

const Index = () => {
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  if (loadingError) {
    return (
      <div style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}>
        <Navbar />
        <div style={{
          margin: "50px 20px",
          color: "#d32f2f"
        }}>
          <h2>Section Loading Error</h2>
          <p>{loadingError.message}</p>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
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
};

export default Index;
