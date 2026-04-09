import { FileCheck, AlertTriangle, GitBranch, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const solutions = [
  {
    icon: "chart",
    image: "/company-images/cv-key-capabilities-features.webp",
    title: "Unified Compliance Dashboard",
    desc: "Get a single-pane view of your entire compliance landscape. Monitor all regulatory requirements, policy adherence, and audit readiness from one centralized dashboard built natively in Salesforce.",
    benefits: ["Real-time compliance status", "Custom KPI tracking", "Executive reporting"],
  },
  {
    icon: FileCheck,
    image: "/company-images/cv-key-capabilities-compliance-testing.webp",
    title: "Automated Audit Trails",
    desc: "Eliminate manual documentation with fully automated audit trails. Every action, approval, and change is captured automatically, making audit preparation effortless and comprehensive.",
    benefits: ["Complete audit history", "Automated evidence capture", "Report generation"],
  },
  {
    icon: AlertTriangle,
    image: "/company-images/cv-key-capabilities-audit-risk.webp",
    title: "Risk & Issue Management",
    desc: "Proactively identify, assess, and mitigate compliance risks. Our intelligent risk scoring engine helps you prioritize issues and track remediation efforts in real-time.",
    benefits: ["Risk scoring automation", "Remediation workflow", "Exception tracking"],
  },
  {
    icon: GitBranch,
    image: "/company-images/cv-key-capabilities-vendor-risk.webp",
    title: "Workflow & Approval Automation",
    desc: "Design and deploy custom compliance workflows with multi-level approval chains. Automate reminders, escalations, and sign-off management to keep everything on track.",
    benefits: ["Custom approval chains", "Automated reminders", "Sign-off management"],
  },
];

const SolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = solutions.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * totalItems), totalItems - 1);
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress, totalItems]);

  const active = solutions[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${totalItems * 80}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="container relative px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-secondary bg-secondary/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              Our Solution
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mt-3 sm:mt-4">
              How Compliance Vista Solves This
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
            {/* Visual */}
            <div className="w-full md:w-1/2 flex justify-center items-stretch">
              <div className="relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl scale-105" />
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl glass-strong overflow-hidden shadow-2xl shadow-primary/20 border border-white/30"
                >
                  <img
                    src={active.image}
                    alt={`Compliance Vista ${active.title} - ${active.desc.substring(0, 80)}...`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 flex flex-col">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-br from-background/40 to-primary/5 p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 md:space-y-6 h-auto md:h-80 lg:h-96 flex flex-col"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">{active.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-justify flex-grow">{active.desc}</p>
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                    {active.benefits.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-foreground">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>


              {/* Progress dots */}
              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-6 mt-2 sm:mt-4 md:mt-0">
                {solutions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-gradient-to-r from-primary to-secondary"
                      : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
