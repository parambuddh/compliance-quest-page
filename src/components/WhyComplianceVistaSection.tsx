import { motion } from "framer-motion";
import { Cloud, Database, Zap, CheckCircle2, Target } from "lucide-react";

const reasons = [
  {
    icon: Cloud,
    title: "100% native to Salesforce",
    description: "Built directly within your Salesforce ecosystem",
  },
  {
    icon: Database,
    title: "No external systems or data storage",
    description: "Keep all your data secure and centralized",
  },
  {
    icon: Zap,
    title: "Automates manual review workflows",
    description: "Eliminate tedious manual processes",
  },
  {
    icon: CheckCircle2,
    title: "Ensures consistent, repeatable, auditable processes",
    description: "Maintain compliance standards effortlessly",
  },
  {
    icon: Target,
    title: "Ideal for assessments across HR, Compliance, Vendor Risk, and Internal Audit",
    description: "Comprehensive solution for all your assessment needs",
  },
];

const WhyComplianceVistaSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background to-surface-light">
      {/* Background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20 px-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Why ComplianceVista
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the key advantages that make ComplianceVista the ideal compliance solution
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            const isLast = index === reasons.length - 1;
            const isLastInGrid = isLast && reasons.length % 3 !== 0;

            return (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  className={`group h-full relative glass-light rounded-2xl p-5 md:p-6 lg:p-7 backdrop-blur-xl border border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden ${
                    isLast && !isLastInGrid ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 60px rgba(0, 200, 150, 0.15)",
                  }}
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon container */}
                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-secondary transition-colors duration-500" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {reason.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Number badge */}
                  <div className="absolute top-4 right-4 md:top-5 md:right-5 text-xs md:text-sm font-bold text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 lg:mt-20 text-center px-4"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            Ready to transform your compliance management?
          </p>
          <motion.button
            className="group relative bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore All Benefits →</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyComplianceVistaSection;
