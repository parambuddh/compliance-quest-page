import { motion } from "framer-motion";
import { CheckCircle, Clipboard, Target, Users, AlertCircle } from "lucide-react";

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    clipboard: <Clipboard className="w-7 h-7" strokeWidth={1.5} />,
    magnifying: <AlertCircle className="w-7 h-7" strokeWidth={1.5} />,
    dartboard: <Target className="w-7 h-7" strokeWidth={1.5} />,
    talkbubbles: <Users className="w-7 h-7" strokeWidth={1.5} />,
  };

  return (
    <div className="drop-shadow-md flex items-center justify-center w-full h-full">
      {iconMap[iconType] || iconMap.clipboard}
    </div>
  );
};

const UseCasesSection = () => {
  const useCases = [
    {
      icon: "clipboard",
      title: "Audit Management",
      description: "Streamline internal and external audits with centralized evidence collection, audit trails, and findings management. Reduce audit preparation time by 60% and ensure nothing falls through the cracks.",
      features: ["Evidence collection", "Audit trails", "Finding management"]
    },
    {
      icon: "magnifying",
      title: "Vendor Risk Assessment",
      description: "Evaluate and monitor third-party vendor compliance and security posture continuously. Minimize supply chain risk and maintain organizational standards across your entire vendor ecosystem.",
      features: ["Vendor evaluation", "Risk monitoring", "Compliance tracking"]
    },
    {
      icon: "dartboard",
      title: "Regulatory Compliance",
      description: "Stay compliant across SOC2, ISO, GDPR, HIPAA, and custom frameworks with pre-built templates and automated reporting. Adapt quickly to regulatory changes without disrupting operations.",
      features: ["Multi-framework", "Auto reporting", "Pre-built templates"]
    },
    {
      icon: "talkbubbles",
      title: "Employee Assessment",
      description: "Manage employee skills, certifications, and competency requirements in one place. Track training completion, ensure role-based qualifications, and maintain workforce compliance effortlessly.",
      features: ["Skills management", "Certification tracking", "Compliance monitoring"]
    }
  ];

  return (
    <section id="use-cases" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-100/25 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
            Real-World Applications
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-slate-900 px-4 mt-4">
            Perfect for Every <span className="text-[#37C643]">Scenario</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Enterprises trust ComplianceVista for comprehensive compliance management across all use cases
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-8">
          {useCases.map((useCase, idx) => {
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
                  className="card-hover-primary bg-white rounded-2xl p-6 md:p-8 h-full relative overflow-hidden border border-slate-200 shadow-sm"
                  aria-label={`${useCase.title}: ${useCase.description}`}
                  role="article"
                >

                  {/* Icon and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="card-icon w-14 h-14 rounded-2xl bg-[#37C643]/10 border border-[#37C643]/20 flex items-center justify-center flex-shrink-0 transition-transform transform-none"
                    >
                      <div className="text-[#37C643] flex items-center justify-center w-full h-full">
                        <IconComponent iconType={useCase.icon} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                        {useCase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed mb-5">
                    {useCase.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {useCase.features.map((feature, fidx) => (
                      <motion.div
                        key={fidx}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + fidx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-[#37C643] flex-shrink-0" />
                        <span className="text-xs md:text-sm text-slate-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
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
