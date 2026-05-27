import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import CalendlyModal from "./CalendlyModal";

const HeroSection = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[85dvh] md:min-h-[100dvh] pt-20 md:pt-0 flex items-center overflow-hidden bg-gradient-to-br from-white via-[#37C643]/5 to-[#37C643]/8">
      {/* Subtle greenish background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#37C643]/3 to-[#37C643]/4" />

      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-primary/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-secondary/8 rounded-full blur-3xl float-animation" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-primary/5 rounded-full blur-2xl float-animation" style={{ animationDelay: "1.5s" }} />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="container relative z-10 py-8 md:py-14">
        <div className="container">
          <div className="grid xl:grid-cols-2 gap-8 xl:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-5 flex flex-col items-center xl:items-start text-center xl:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm mt-4 sm:mt-8 mb-0"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-foreground/80 font-medium">Salesforce-Native Solution</span>
              </motion.div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-[1.2] text-foreground space-y-1 sm:space-y-2 whitespace-nowrap">
                <div className="text-[#37C643] flex flex-col items-center xl:items-start">
                  <span>Assessments. Risk.</span>
                  <span>Compliance.</span>
                </div>
                <div className="flex flex-col items-center xl:items-start">
                  <span>All Automated.</span>
                  <span className="relative w-fit">
                    All inside Salesforce.
                    <svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                      <motion.path
                        d="M2 10C50 6 150 6 198 10"
                        stroke="#39B44A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </svg>
                  </span>
                </div>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto xl:mx-0">
                ComplianceVista brings employee 360 reviews, vendor risk assessments, compliance checks, and audit workflows together in one Salesforce-native platform - powered by SurveyVista.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center xl:justify-start">
                <button
                  onClick={() => setIsCalendlyOpen(true)}
                  className="group relative bg-[#37C643] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-lg hover:shadow-[#37C643]/40 transition-all duration-300 hover:-translate-y-1 text-center text-sm sm:text-base"
                >
                  <span className="relative z-10">Book a Demo</span>
                  <div className="absolute inset-0 rounded-full bg-[#37C643] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <a
                  href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000J6DYBUA3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border-2 border-[#37C643] text-[#37C643] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold overflow-hidden shadow-sm hover:shadow-md hover:shadow-[#37C643]/20 transition-all duration-300 hover:-translate-y-1 text-center text-sm sm:text-base bg-white hover:bg-[#37C643]/5 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">View On AppExchange</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center xl:justify-start">
                {["100% Native Salesforce", "Enterprise Security", "Real-time Tracking"].map((t, i) => (
                  <span key={i} className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-muted-foreground glass rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hero graphic - Company Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative pb-8">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl scale-110" />

                <div className="relative w-full max-w-[20rem] sm:max-w-[22rem] md:max-w-[26rem] xl:max-w-[30rem] h-64 sm:h-72 md:h-80 xl:h-96 rounded-3xl overflow-hidden glass-strong shadow-2xl shadow-primary/20 border border-white/30 float-animation">
                  <img
                    src="/company-images/cv-hero-new.webp"
                    alt="ComplianceVista Enterprise Dashboard - Unified compliance management and audit automation platform for Salesforce"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    width={480}
                    height={384}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-0 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-2 glow-primary float-animation"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Compliant</p>
                    <p className="text-[10px] text-muted-foreground">All checks passed</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </section>
  );
};

export default HeroSection;
