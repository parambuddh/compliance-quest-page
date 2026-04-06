import { LayoutDashboard, FileCheck, AlertTriangle, GitBranch, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const solutions = [
  {
    icon: LayoutDashboard,
    title: "Unified Compliance Dashboard",
    desc: "Get a single-pane view of your entire compliance landscape. Monitor all regulatory requirements, policy adherence, and audit readiness from one centralized dashboard built natively in Salesforce.",
    benefits: ["Real-time compliance status", "Custom KPI tracking", "Executive reporting"],
  },
  {
    icon: FileCheck,
    title: "Automated Audit Trails",
    desc: "Eliminate manual documentation with fully automated audit trails. Every action, approval, and change is captured automatically, making audit preparation effortless and comprehensive.",
    benefits: ["Complete audit history", "Automated evidence capture", "Report generation"],
  },
  {
    icon: AlertTriangle,
    title: "Risk & Issue Management",
    desc: "Proactively identify, assess, and mitigate compliance risks. Our intelligent risk scoring engine helps you prioritize issues and track remediation efforts in real-time.",
    benefits: ["Risk scoring automation", "Remediation workflow", "Exception tracking"],
  },
  {
    icon: GitBranch,
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
  const ActiveIcon = active.icon;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${totalItems * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
              Our Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              How Compliance Vista Solves This
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto">
            {/* Visual */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl scale-105" />
                <div className="relative w-52 h-52 lg:w-64 lg:h-64 rounded-3xl glass-strong flex items-center justify-center transition-transform duration-500">
                  <motion.div
                    key={activeIndex}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <ActiveIcon className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 space-y-5 min-h-[280px]">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <h3 className="text-2xl font-bold gradient-text">{active.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{active.desc}</p>
                <ul className="space-y-3">
                  {active.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Progress dots */}
              <div className="flex gap-2 pt-4">
                {solutions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-gradient-to-r from-primary to-secondary"
                        : "w-1.5 bg-border"
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
