import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * useCases.length * 1.3),
        useCases.length - 1
      );
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const activeUseCase = useCases[activeIndex];
  const progress = (activeIndex / (useCases.length - 1)) * 100;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${useCases.length * 160}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/3 to-primary/3" />
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"
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
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <IconComponent iconType={activeUseCase.icon} />
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
                  {activeUseCase.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeUseCase.desc}
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

            {/* Industry list on right */}
            <div className="hidden xl:flex flex-col gap-6 w-1/3">
              {useCases.map((u, i) => (
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
                  <div className="font-medium text-base truncate">{u.title}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
