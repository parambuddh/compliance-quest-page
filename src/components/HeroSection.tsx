import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import GetNowModal from "./GetNowModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden mesh-bg">
      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-primary/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-secondary/8 rounded-full blur-3xl float-animation" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-primary/5 rounded-full blur-2xl float-animation" style={{ animationDelay: "1.5s" }} />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground/80 font-medium">Salesforce-Native Solution</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-foreground space-y-2">
              <div>
                <span className="gradient-text">Assessments. Risk. Compliance.</span>
              </div>
              <div>
                All Automated.{" "}
                <span className="relative inline-block">
                  All inside Salesforce.
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke="hsl(168 76% 42%)" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              ComplianceVista brings employee 360 reviews, vendor risk assessments, compliance checks, and audit workflows together in one Salesforce-native platform - powered by SurveyVista.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="group relative bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="relative z-10">Request Demo</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="glass px-8 py-4 rounded-full font-semibold text-foreground overflow-hidden shadow-xl hover:bg-white/80 hover:shadow-lg hover:shadow-white/30 transition-all duration-300 hover:-translate-y-1"
              >
                Get it now →
              </button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {["100% Native Salesforce", "Enterprise Security", "Real-time Tracking"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground glass rounded-full px-3 py-1.5">
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
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl scale-110" />

              <div className="relative w-96 h-80 lg:w-96 lg:h-96 rounded-3xl glass-strong overflow-hidden float-animation shadow-2xl shadow-primary/20 border border-white/30">
                <img
                  src="/company-images/CV_HERO_NEW.png"
                  alt="ComplianceVista Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-2 glow-primary float-animation"
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

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>

      <GetNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
