import { Landmark, Heart, Cpu, Factory, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  { icon: Landmark, title: "Financial Services", desc: "Meet regulatory requirements including Basel III, CCAR, and stress testing compliance." },
  { icon: Heart, title: "Healthcare", desc: "HIPAA compliance, patient data governance, and clinical trial oversight." },
  { icon: Cpu, title: "Technology / SaaS", desc: "SOC2 compliance, data residency management, and vendor risk assessment." },
  { icon: Factory, title: "Manufacturing", desc: "Quality and safety compliance, ISO standards, and supply chain governance." },
  { icon: GraduationCap, title: "Education", desc: "FERPA compliance, institutional governance, and research data protection." },
];

const UseCasesSection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 dot-pattern opacity-30" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-4">
          Industries
        </span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          Compliance Vista Across Industries
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {useCases.map((u, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group glass-strong rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:glow-secondary cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/15 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <u.icon className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{u.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
