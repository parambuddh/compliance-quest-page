import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { label: "SOC 2 Type II", desc: "Verified controls" },
  { label: "ISO 27001", desc: "Security certified" },
  { label: "GDPR Compliant", desc: "Data protection" },
  { label: "HIPAA Ready", desc: "Healthcare ready" },
];

const CertificationsSection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-surface-accent via-background to-primary/5" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
          Trust & Security
        </span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          Enterprise-Grade Security & Compliance
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground leading-relaxed text-lg"
        >
          Compliance Vista is built entirely on Salesforce's secure infrastructure.
          Your data never leaves the Salesforce platform. We maintain industry-leading
          compliance certifications to protect your organization and meet the most
          stringent regulatory requirements.
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-strong rounded-2xl p-5 text-center hover:glow-primary transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="font-bold text-sm text-foreground">{b.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CertificationsSection;
