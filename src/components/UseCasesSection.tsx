import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Briefcase, AlertTriangle, Shield, Users } from "lucide-react";

const UseCasesSection = () => {
  const useCases = [
    {
      icon: Briefcase,
      title: "Audit Management",
      description: "Streamline internal and external audits with centralized evidence collection, audit trails, and findings management. Reduce audit preparation time by 60% and ensure nothing falls through the cracks.",
      features: ["Evidence collection", "Audit trails", "Finding management"]
    },
    {
      icon: AlertTriangle,
      title: "Vendor Risk Assessment",
      description: "Evaluate and monitor third-party vendor compliance and security posture continuously. Minimize supply chain risk and maintain organizational standards across your entire vendor ecosystem.",
      features: ["Vendor evaluation", "Risk monitoring", "Compliance tracking"]
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Stay compliant across SOC2, ISO, GDPR, HIPAA, and custom frameworks with pre-built templates and automated reporting. Adapt quickly to regulatory changes without disrupting operations.",
      features: ["Multi-framework", "Auto reporting", "Pre-built templates"]
    },
    {
      icon: Users,
      title: "Employee Assessment",
      description: "Manage employee skills, certifications, and competency requirements in one place. Track training completion, ensure role-based qualifications, and maintain workforce compliance effortlessly.",
      features: ["Skills management", "Certification tracking", "Compliance monitoring"]
    }
  ];

  return (
    <section id="use-cases" className="py-8 md:py-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/2 to-background" />
      <motion.div 
        className="absolute top-40 -right-40 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-40 -left-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30">
              <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Real-World Applications
              </span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 gradient-text px-4">
            Perfect for Every Scenario
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Enterprises trust ComplianceVista for comprehensive compliance management across all use cases
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-8">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div 
                  className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full relative overflow-hidden"
                  aria-label={`${useCase.title}: ${useCase.description}`}
                  role="article"
                >
                  {/* Number badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-3xl sm:text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Icon and title */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text group-hover:opacity-80 transition-opacity">
                        {useCase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                    {useCase.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                    {useCase.features.map((feature, fidx) => (
                      <motion.div
                        key={fidx}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + fidx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover border */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default UseCasesSection;
