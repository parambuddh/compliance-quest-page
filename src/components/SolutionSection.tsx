import { LayoutDashboard, FileCheck, AlertTriangle, GitBranch, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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

const SolutionSection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 dot-pattern opacity-30" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
          Our Solution
        </span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          How Compliance Vista Solves This
        </h2>
      </motion.div>

      <div className="space-y-24">
        {solutions.map((s, i) => {
          const reversed = i % 2 !== 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center max-w-5xl mx-auto`}
            >
              {/* Visual */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl scale-105 group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative w-52 h-52 lg:w-64 lg:h-64 rounded-3xl glass-strong flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                      <s.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 space-y-5">
                <h3 className="text-2xl font-bold gradient-text">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="space-y-3">
                  {s.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionSection;
