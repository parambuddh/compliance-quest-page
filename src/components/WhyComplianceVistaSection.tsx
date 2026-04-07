import { motion } from "framer-motion";
import { Cloud, Database, Zap, CheckCircle2, Target } from "lucide-react";

const reasons = [
  {
    icon: Cloud,
    title: "100% native to Salesforce",
    description: "Built directly within your Salesforce ecosystem",
    position: "left",
  },
  {
    icon: Database,
    title: "No external systems or data storage",
    description: "Keep all your data secure and centralized",
    position: "center-top",
  },
  {
    icon: Zap,
    title: "Automates manual review workflows",
    description: "Eliminate tedious manual processes",
    position: "right",
  },
  {
    icon: CheckCircle2,
    title: "Ensures consistent, repeatable, auditable processes",
    description: "Maintain compliance standards effortlessly",
    position: "left-bottom",
  },
  {
    icon: Target,
    title: "Ideal for assessments across HR, Compliance, Vendor Risk, and Internal Audit",
    description: "Comprehensive solution for all your assessment needs",
    position: "right-bottom",
  },
];

const WhyComplianceVistaSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
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
          className="text-center mb-16 md:mb-20 lg:mb-24 px-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Why ComplianceVista
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the key advantages that make ComplianceVista the ideal compliance solution
          </p>
        </motion.div>

        {/* Benefits - Unique Flowing Layout */}
        <motion.div
          className="max-w-6xl mx-auto px-4 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Grid Layout for Benefits */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
            {/* Left Column - Top */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:col-span-1 lg:row-span-2 justify-start">
              <motion.div
                className="relative group mb-6 w-full max-w-xs"
                whileHover={{ y: -12 }}
              >
                {/* Large Icon Circle */}
                <div className="relative h-40 w-40 mx-auto">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(0, 200, 150, 0.3)",
                        "0 0 50px rgba(0, 200, 150, 0.5)",
                        "0 0 30px rgba(0, 200, 150, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cloud className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div className="text-center" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                  {reasons[0].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reasons[0].description}
                </p>
              </motion.div>
            </motion.div>

            {/* Center Column - Top and Bottom */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:col-span-1 justify-start">
              <motion.div
                className="relative group mb-6 w-full max-w-xs"
                whileHover={{ y: -12 }}
              >
                <div className="relative h-40 w-40 mx-auto">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(0, 200, 150, 0.3)",
                        "0 0 50px rgba(0, 200, 150, 0.5)",
                        "0 0 30px rgba(0, 200, 150, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div className="text-center" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                  {reasons[1].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reasons[1].description}
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Top */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:col-span-1 lg:row-span-2 justify-start">
              <motion.div
                className="relative group mb-6 w-full max-w-xs"
                whileHover={{ y: -12 }}
              >
                <div className="relative h-40 w-40 mx-auto">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(0, 200, 150, 0.3)",
                        "0 0 50px rgba(0, 200, 150, 0.5)",
                        "0 0 30px rgba(0, 200, 150, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </motion.div>

              <motion.div className="text-center" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                  {reasons[2].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reasons[2].description}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Row - 2 Items */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-6 mt-12 lg:mt-20 max-w-2xl mx-auto">
            {[3, 4].map((idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center">
                <motion.div
                  className="relative group mb-6 w-full max-w-xs"
                  whileHover={{ y: -12 }}
                >
                  <div className="relative h-40 w-40 mx-auto">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 30px rgba(0, 200, 150, 0.3)",
                          "0 0 50px rgba(0, 200, 150, 0.5)",
                          "0 0 30px rgba(0, 200, 150, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: idx * 0.5,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {idx === 3 ? (
                        <CheckCircle2 className="w-16 h-16 text-primary" />
                      ) : (
                        <Target className="w-16 h-16 text-primary" />
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div className="text-center" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                    {reasons[idx].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {reasons[idx].description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyComplianceVistaSection;
