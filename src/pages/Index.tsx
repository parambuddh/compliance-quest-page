import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CertificationsSection from "@/components/CertificationsSection";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationSection from "@/components/IntegrationSection";
import FinalCTASection from "@/components/FinalCTASection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CertificationsSection />
      <UseCasesSection />
      <IntegrationSection />
      <FinalCTASection />
      <ContactSection />
    </main>
    <FooterSection />
  </>
);

export default Index;
