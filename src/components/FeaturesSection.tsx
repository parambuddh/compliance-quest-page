import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  { icon: "clipboard", title: "Policy Management", desc: "Centralized repository with version control and policy lifecycle management." },
  { icon: "dartboard", title: "Access Control", desc: "Role-based permissions and segregation of duties for enterprise security." },
  { icon: "chart", title: "Compliance Reporting", desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks." },
  { icon: "lightning", title: "Deadline Tracking", desc: "Automated compliance reminders and deadline management with escalations." },
  { icon: "magnifying", title: "Audit Management", desc: "Evidence collection, audit trail management, and finding resolution." },
  { icon: "circular", title: "Mobile Access", desc: "Manage compliance on-the-go with full mobile Salesforce experience." },
];

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: string } = {
    clipboard: "/icons/SV-Clipboard.png",
    dartboard: "/icons/SV-Dartboard.png",
    chart: "/icons/SV-Chart.png",
    lightning: "/icons/SV-LightningBolt.png",
    magnifying: "/icons/SV-MagnifyingGlass.png",
    circular: "/icons/SV-CircularArrows.png",
  };

  return (
    <img
      src={iconMap[iconType]}
      alt={iconType}
      className="w-8 h-8 object-contain drop-shadow-md"
    />
  );
};

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-secondary/3" />
      <motion.div 
        className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Powerful Capabilities
              </span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Enterprise Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive compliance management tools designed for modern enterprises. Explore each feature to see how we simplify compliance.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-5xl mx-auto">
          {/* Feature Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="glass-strong rounded-3xl p-10 md:p-14 relative mb-8"
          >
            {/* Number badge */}
            <motion.div
              className="absolute top-8 right-8 text-5xl md:text-6xl font-bold text-primary/15"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.div>

            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <IconComponent iconType={activeFeature.icon} />
              </motion.div>
              <motion.h3
                className="text-3xl md:text-4xl font-bold gradient-text"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {activeFeature.title}
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {activeFeature.desc}
            </motion.p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Previous Button */}
            <motion.button
              onClick={goToPrevious}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-primary to-secondary w-8 h-3"
                      : "bg-border w-3 h-3 hover:bg-border/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={goToNext}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </motion.button>
          </div>

          {/* Feature titles for reference */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  index === activeIndex
                    ? "glass-strong border-primary/50 bg-primary/10"
                    : "border-border/30 hover:border-primary/30 hover:bg-primary/5"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm font-semibold text-primary mb-1">0{index + 1}</div>
                <div className="font-medium text-sm text-foreground line-clamp-2">
                  {feature.title}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
