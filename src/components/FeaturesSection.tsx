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
  
  // Show 2 cards at a time, so carouselIndex goes from 0 to 2 (3 groups total)
  const carouselIndex = Math.floor(activeIndex / 2);
  const visibleFeatures = [features[activeIndex], features[activeIndex + 1]].filter(Boolean);

  // Auto-carousel with 3-second interval, advancing by 2 each time
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev + 2;
        return nextIndex >= features.length ? 0 : nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? Math.max(0, features.length - 2) : prev - 2));
  };

  const goToNext = () => {
    setActiveIndex((prev) => {
      const nextIndex = prev + 2;
      return nextIndex >= features.length ? 0 : nextIndex;
    });
  };

  return (
    <section id="features" className="py-10 md:py-12 lg:py-16 relative overflow-hidden">
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

        {/* Carousel Container - 2 Cards Display */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Features Grid - 2 cards side by side, full width on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
            {visibleFeatures.map((feature, idx) => (
              <motion.div
                key={activeIndex + idx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="glass-strong rounded-2xl p-6 md:p-8 h-full relative overflow-hidden">
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {String(features.indexOf(feature) + 1).padStart(2, "0")}
                  </div>

                  {/* Icon and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <IconComponent iconType={feature.icon} />
                    </motion.div>
                    <motion.h3
                      className="text-lg md:text-xl font-bold text-foreground pt-2"
                    >
                      {feature.title}
                    </motion.h3>
                  </div>

                  {/* Description Section */}
                  <motion.p
                    className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 font-semibold"
                  >
                    {feature.desc}
                  </motion.p>

                  {/* Benefits Section */}
                  <motion.div
                    className="mt-auto"
                  >
                    <div className="space-y-2">
                      {feature?.benefits && feature.benefits.length > 0 ? (
                        feature.benefits.map((benefit, bidx) => (
                          <motion.div
                            key={bidx}
                            className="flex items-start gap-2 text-xs md:text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + bidx * 0.1 }}
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground leading-tight">{benefit}</span>
                          </motion.div>
                        ))
                      ) : null}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap mt-6 md:mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={goToPrevious}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </motion.button>

            {/* Dots indicator - 3 groups for 6 cards shown 2 at a time */}
            <div className="flex gap-1.5 md:gap-2">
              {[0, 1, 2].map((index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index * 2)}
                  className={`transition-all duration-300 rounded-full ${
                    carouselIndex === index
                      ? "bg-gradient-to-r from-primary to-secondary w-5 md:w-6 h-2 md:h-2.5"
                      : "bg-border w-2 md:w-2.5 h-2 md:h-2.5 hover:bg-border/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={goToNext}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
