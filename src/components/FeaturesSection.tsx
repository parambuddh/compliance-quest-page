import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * features.length * 1.2),
        features.length - 1
      );
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const activeFeature = features[activeIndex];
  const progress = (activeIndex / (features.length - 1)) * 100;

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative"
      style={{ height: `${features.length * 160}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
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
          <div className="flex items-center justify-center gap-12 max-w-6xl mx-auto">
            {/* Central content card */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="w-full lg:w-3/4 max-w-5xl"
            >
              <div className="glass-strong rounded-3xl p-10 md:p-12 relative">
                {/* Icon on top left */}
                <motion.div
                  className="absolute top-6 left-8 w-20 h-20 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <IconComponent iconType={activeFeature.icon} />
                </motion.div>

                {/* Number on top right */}
                <motion.div
                  className="absolute top-8 right-8 text-6xl font-bold text-primary/15"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </motion.div>

                {/* Content with top padding for icon */}
                <div className="pt-8">

                {/* Title */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold gradient-text mb-3"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {activeFeature.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeFeature.desc}
                </motion.p>

                {/* Progress bar - left to right */}
                <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                </div>
              </div>
            </motion.div>

            {/* Feature list on right (mobile swipe indicator) */}
            <div className="hidden xl:flex flex-col gap-6 w-1/3">
              {features.map((f, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 ${
                    i === activeIndex
                      ? "glass-strong glow-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <div className="text-sm font-semibold">0{i + 1}</div>
                  <div className="font-medium text-base truncate">{f.title}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
