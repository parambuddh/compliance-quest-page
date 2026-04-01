import { ShieldAlert, FileSearch, Eye, Workflow } from "lucide-react";

const problems = [
  { icon: ShieldAlert, title: "Scattered Compliance Data", desc: "Multiple systems, no unified view of compliance status across the organization." },
  { icon: FileSearch, title: "Manual Audit Trails", desc: "Time-consuming, error-prone documentation that risks regulatory findings." },
  { icon: Eye, title: "Risk Visibility Gaps", desc: "Hard to identify non-compliance in real-time before it becomes a problem." },
  { icon: Workflow, title: "Workflow Inefficiency", desc: "Disconnected approvals and sign-offs slowing down compliance processes." },
];

const ProblemSection = () => (
  <section id="overview" className="py-20 md:py-28 bg-surface-accent">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Enterprise Compliance Challenges
      </h2>
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {problems.map((p, i) => (
          <div
            key={i}
            className="bg-background border-l-4 border-primary rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <p.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
