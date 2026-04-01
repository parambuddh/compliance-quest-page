import { ClipboardList, Lock, BarChart3, Clock, Search, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: ClipboardList, title: "Policy Management", desc: "Centralized repository with version control and policy lifecycle management." },
  { icon: Lock, title: "Access Control", desc: "Role-based permissions and segregation of duties for enterprise security." },
  { icon: BarChart3, title: "Compliance Reporting", desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks." },
  { icon: Clock, title: "Deadline Tracking", desc: "Automated compliance reminders and deadline management with escalations." },
  { icon: Search, title: "Audit Management", desc: "Evidence collection, audit trail management, and finding resolution." },
  { icon: Smartphone, title: "Mobile Access", desc: "Manage compliance on-the-go with full mobile Salesforce experience." },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-surface-light to-background" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-4">
          Features
        </span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Powerful Features Built for Enterprise
        </h2>
        <p className="text-muted-foreground">Everything you need at enterprise scale</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group glass-strong rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 hover:glow-primary relative overflow-hidden cursor-default"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
