import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const features = [
  { 
    icon: "clipboard", 
    title: "Policy Management", 
    desc: "Centralized repository with version control and policy lifecycle management.",
    benefits: ["Version control", "Centralized storage", "Lifecycle tracking"]
  },
  { 
    icon: "dartboard", 
    title: "Access Control", 
    desc: "Role-based permissions and segregation of duties for enterprise security.",
    benefits: ["Role-based access", "Duty segregation", "Audit trails"]
  },
  { 
    icon: "chart", 
    title: "Compliance Reporting", 
    desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks.",
    benefits: ["Pre-built reports", "Multi-framework", "Custom exports"]
  },
  { 
    icon: "lightning", 
    title: "Deadline Tracking", 
    desc: "Automated compliance reminders and deadline management with escalations.",
    benefits: ["Auto reminders", "Escalations", "Real-time updates"]
  },
  { 
    icon: "magnifying", 
    title: "Audit Management", 
    desc: "Evidence collection, audit trail management, and finding resolution.",
    benefits: ["Evidence tracking", "Audit trails", "Finding manager"]
  },
  { 
    icon: "circular", 
    title: "Mobile Access", 
    desc: "Manage compliance on-the-go with full mobile Salesforce experience.",
    benefits: ["Mobile app", "Full sync", "Offline support"]
  },
];

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: string } = {
    clipboard: "/icons/SV-Clipboard.png",
    dartboard: "/icons/SV-Dartboard.png",
    chart: "/icons/SV-Chart.png",
    lightning: "/icons/SV-LightningBolt.png",
    magnifying: "/icons/SV-MagnifyingGlass.png",
    circular: "/icons/SV-MobileAccess.png",
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

  // Auto-carousel with 2-second interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="features" className="py-12 md:py-16 lg:py-24 relative overflow-hidden">
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
          className="text-center mb-12 md:mb-16 lg:mb-20 px-4"
        >
          <div className="inline-block mb-4 md:mb-6">
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Powerful Capabilities
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 gradient-text px-4">
            Enterprise Features
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Comprehensive compliance management tools designed for modern enterprises.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Feature Card - Redesigned Layout */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 relative mb-8 md:mb-10"
          >
            {/* Number badge */}
            <motion.div
              className="absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 text-3xl md:text-5xl lg:text-6xl font-bold text-primary/15"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.div>

            {/* Header Section - Icon and Title */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl md:rounded-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <IconComponent iconType={activeFeature.icon} />
                </motion.div>
                <motion.h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text pt-2"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {activeFeature.title}
                </motion.h3>
              </div>
            </div>

            {/* Description Section with better spacing */}
            <motion.p
              className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8 lg:mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {activeFeature.desc}
            </motion.p>

            {/* Benefits Section with improved visibility */}
            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xs md:text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                Key Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {activeFeature?.benefits && activeFeature.benefits.length > 0 ? (
                  activeFeature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-foreground">{benefit}</span>
                    </motion.div>
                  ))
                ) : null}
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full h-1.5 md:h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6 flex-wrap">
            {/* Previous Button */}
            <motion.button
              onClick={goToPrevious}
              className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-1.5 md:gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-primary to-secondary w-5 md:w-6 lg:w-8 h-2 md:h-2.5 lg:h-3"
                      : "bg-border w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3 hover:bg-border/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={goToNext}
              className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary" />
            </motion.button>
          </div>

          {/* Counter Display */}
          <div className="text-center mt-6 md:mt-8">
            <span className="text-xs md:text-sm text-muted-foreground">
              Feature <span className="font-semibold text-primary">{activeIndex + 1}</span> of <span className="font-semibold">{features.length}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
