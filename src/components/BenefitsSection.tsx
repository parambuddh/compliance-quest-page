import { motion } from "framer-motion";

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: string } = {
    dartboard: "/icons/SV-Dartboard.webp",
    lightning: "/icons/SV-LightningBolt.webp",
    magnifying: "/icons/SV-MagnifyingGlass.webp",
    chart: "/icons/SV-Chart.webp",
    clipboard: "/icons/SV-Clipboard.webp",
  };

  const altTextMap: { [key: string]: string } = {
    dartboard: "Dartboard icon representing risk minimization through compliance",
    lightning: "Lightning bolt icon representing operational efficiency gains",
    magnifying: "Magnifying glass icon representing improved compliance visibility",
    chart: "Chart icon representing business growth through compliance",
    clipboard: "Clipboard icon representing trust and reputation building",
  };

  return (
    <img
      src={iconMap[iconType]}
      alt={altTextMap[iconType] || iconType}
      loading="lazy"
      decoding="async"
      className="w-8 h-8 object-contain drop-shadow-md"
    />
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "dartboard",
      title: "Minimize Risk",
      description: "Proactively identify and mitigate compliance risks with real-time monitoring and automated assessments across your entire organization."
    },
    {
      icon: "lightning",
      title: "Increase Operational Efficiency",
      description: "Automate manual workflows and cut compliance cycle time significantly. Free your team to focus on strategic initiatives instead of repetitive tasks."
    },
    {
      icon: "magnifying",
      title: "Improve Visibility",
      description: "Gain complete transparency into your compliance landscape with centralized dashboards and real-time analytics for every department."
    },
    {
      icon: "chart",
      title: "Drive Business Growth",
      description: "Build compliance into your competitive strategy and accelerate market entry into regulated industries with confidence and authority."
    },
    {
      icon: "clipboard",
      title: "Build Trust & Reputation",
      description: "Demonstrate commitment to governance and ethical practices to customers, partners, and stakeholders for premium opportunities."
    }
  ];

  return (
    <section id="benefits" className="py-10 sm:py-12 md:py-14 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
      <motion.div 
        className="absolute top-20 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-primary/8 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
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
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 gradient-text px-4 mt-4">
            Key Benefits
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Transform your compliance management and unlock competitive advantages
          </p>
        </motion.div>

        {/* Benefits Grid - Using flexbox to allow centering of the last two cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1.34rem)]"
              >
                {/* Card */}
                <div 
                  className="relative rounded-xl sm:rounded-2xl glass-strong p-4 sm:p-6 md:p-8 h-full overflow-hidden transition-all duration-300 border border-white/20 hover:border-primary/40"
                  aria-label={`${benefit.title}: ${benefit.description}`}
                  role="article"
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-5xl font-bold text-primary/10 group-hover:text-primary/15 transition-colors pointer-events-none" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform relative z-10"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <IconComponent iconType={benefit.icon} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold gradient-text mb-2 sm:mb-3 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed relative z-10">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
