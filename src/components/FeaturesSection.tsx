import { ClipboardList, Lock, BarChart3, Clock, Search, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  { icon: ClipboardList, title: "Policy Management", desc: "Centralized repository with version control and policy lifecycle management." },
  { icon: Lock, title: "Access Control", desc: "Role-based permissions and segregation of duties for enterprise security." },
  { icon: BarChart3, title: "Compliance Reporting", desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks." },
  { icon: Clock, title: "Deadline Tracking", desc: "Automated compliance reminders and deadline management with escalations." },
  { icon: Search, title: "Audit Management", desc: "Evidence collection, audit trail management, and finding resolution." },
  { icon: Smartphone, title: "Mobile Access", desc: "Manage compliance on-the-go with full mobile Salesforce experience." },
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
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

        {/* Horizontal scroll carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4 -mx-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass-strong rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 hover:glow-primary relative overflow-hidden cursor-default snap-center flex-shrink-0 w-[320px] min-h-[220px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                    <f.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll fade indicators */}
          <div className="absolute top-0 bottom-6 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-6 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">← Scroll to explore →</p>
      </div>
    </section>
  );
};

export default FeaturesSection;
