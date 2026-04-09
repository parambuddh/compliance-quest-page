import { motion } from "framer-motion";
import { Shield, Zap, Eye, TrendingUp, Star } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Minimize Risk",
      description: "Proactively identify and mitigate compliance risks with real-time monitoring and automated assessments across your entire organization."
    },
    {
      icon: Zap,
      title: "Increase Operational Efficiency",
      description: "Automate manual workflows and cut compliance cycle time significantly. Free your team to focus on strategic initiatives instead of repetitive tasks."
    },
    {
      icon: Eye,
      title: "Improve Visibility",
      description: "Gain complete transparency into your compliance landscape with centralized dashboards and real-time analytics for every department."
    },
    {
      icon: TrendingUp,
      title: "Drive Business Growth",
      description: "Build compliance into your competitive strategy and accelerate market entry into regulated industries with confidence and authority."
    },
    {
      icon: Star,
      title: "Build Trust & Reputation",
      description: "Demonstrate commitment to governance and ethical practices to customers, partners, and stakeholders for premium opportunities."
    }
  ];

  return (
    <section id="benefits" className="py-8 md:py-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
      <motion.div 
        className="absolute top-20 -left-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text px-4">
            Key Benefits
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Transform your compliance management and unlock competitive advantages
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative rounded-2xl glass-strong p-6 md:p-8 h-full overflow-hidden transition-all duration-300 border border-white/20 hover:border-primary/40">
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 text-5xl font-bold text-primary/10 group-hover:text-primary/15 transition-colors pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-semibold gradient-text mb-3 relative z-10">
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
