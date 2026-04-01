import { LayoutDashboard, FileCheck, AlertTriangle, GitBranch, CheckCircle } from "lucide-react";

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
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
        How Compliance Vista Solves This
      </h2>
      <div className="space-y-20">
        {solutions.map((s, i) => {
          const reversed = i % 2 !== 0;
          return (
            <div
              key={i}
              className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center max-w-5xl mx-auto`}
            >
              {/* Visual */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center">
                  <s.icon className="w-20 h-20 text-primary" />
                </div>
              </div>
              {/* Text */}
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-primary">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
                <ul className="space-y-2">
                  {s.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionSection;
