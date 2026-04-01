import { Landmark, Heart, Cpu, Factory, GraduationCap } from "lucide-react";

const useCases = [
  { icon: Landmark, title: "Financial Services", desc: "Meet regulatory requirements including Basel III, CCAR, and stress testing compliance." },
  { icon: Heart, title: "Healthcare", desc: "HIPAA compliance, patient data governance, and clinical trial oversight." },
  { icon: Cpu, title: "Technology / SaaS", desc: "SOC2 compliance, data residency management, and vendor risk assessment." },
  { icon: Factory, title: "Manufacturing", desc: "Quality and safety compliance, ISO standards, and supply chain governance." },
  { icon: GraduationCap, title: "Education", desc: "FERPA compliance, institutional governance, and research data protection." },
];

const UseCasesSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Compliance Vista Across Industries
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {useCases.map((u, i) => (
          <div key={i} className="bg-surface-light border-l-4 border-primary rounded-lg p-6 shadow-sm">
            <u.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-1">{u.title}</h3>
            <p className="text-sm text-muted-foreground">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
