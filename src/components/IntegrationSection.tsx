import { Cloud } from "lucide-react";
import { motion } from "framer-motion";

const clouds = ["Service Cloud", "Sales Cloud", "Commerce Cloud", "Einstein AI"];

const IntegrationSection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-surface-light to-background" />

    <div className="container relative text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-secondary bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
          Integration
        </span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Seamless Salesforce Integration
        </h2>
        <p className="text-sm text-muted-foreground mb-6">100% native Salesforce. Works with all clouds.</p>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Compliance Vista integrates directly with Salesforce Service Cloud, Sales Cloud,
          Commerce Cloud, and Einstein. Map compliance requirements to any Salesforce object
          and automate governance workflows without leaving the platform.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        {clouds.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass-strong rounded-2xl px-6 py-4 flex items-center gap-3 hover:-translate-y-1 hover:glow-secondary transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cloud className="w-4 h-4 text-secondary" />
            </div>
            <span className="font-semibold text-sm text-foreground">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationSection;
