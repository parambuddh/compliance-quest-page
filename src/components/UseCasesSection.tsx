import { motion } from "framer-motion";
import { useRef } from "react";

const useCases = [
  { icon: "chart", title: "Financial Services", desc: "Meet regulatory requirements including Basel III, CCAR, and stress testing compliance." },
  { icon: "clipboard", title: "Healthcare", desc: "HIPAA compliance, patient data governance, and clinical trial oversight." },
  { icon: "aibrain", title: "Technology / SaaS", desc: "SOC2 compliance, data residency management, and vendor risk assessment." },
  { icon: "circular", title: "Manufacturing", desc: "Quality and safety compliance, ISO standards, and supply chain governance." },
  { icon: "talkbubbles", title: "Education", desc: "FERPA compliance, institutional governance, and research data protection." },
];

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: string } = {
    chart: "/icons/SV-Chart.png",
    clipboard: "/icons/SV-Clipboard.png",
    aibrain: "/icons/SV-AIbrain.png",
    circular: "/icons/SV-CircularArrows.png",
    talkbubbles: "/icons/SV-TalkBubbles.png",
  };

  return (
    <img
      src={iconMap[iconType]}
      alt={iconType}
      className="w-8 h-8 object-contain drop-shadow-md"
    />
  );
};

const UseCasesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/2 to-primary/2" />
      <motion.div 
        className="absolute top-20 -right-32 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"
        animate={{ 
          x: [-40, 40, -40],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        animate={{ 
          x: [40, -40, 40],
          y: [0, -50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Industry Solutions
              </span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Built for Every Industry
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tailored compliance solutions for your specific industry challenges and regulatory requirements.
          </p>
        </motion.div>

        {/* Grid Layout - Different from Features sticky scroll */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <motion.div
                className="glass-strong rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300 hover:glow-primary"
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient background accent on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                />

                {/* Icon Container */}
                <motion.div
                  className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent iconType={useCase.icon} />
                </motion.div>

                {/* Number */}
                <motion.div
                  className="absolute top-6 right-6 text-4xl font-bold text-primary/10 group-hover:text-primary/20 transition-all duration-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-all duration-300">
                    {useCase.desc}
                  </p>

                  {/* Separator line */}
                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
