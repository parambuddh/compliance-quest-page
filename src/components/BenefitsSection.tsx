import { motion } from "framer-motion";
import { Shield, Zap, Eye, TrendingUp, Star } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Minimize Risk",
      description: "Proactively identify and mitigate compliance risks across your organization with real-time monitoring and automated risk assessments. Reduce vulnerability windows and ensure consistent policy adherence across teams, departments, and jurisdictions.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Increase Operational Efficiency",
      description: "Automate manual compliance workflows and eliminate repetitive tasks. Cut compliance management cycle time by streamlining approvals, evidence collection, and reporting—freeing your team to focus on strategic initiatives.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Eye,
      title: "Improve Visibility",
      description: "Gain complete transparency into your compliance landscape with centralized dashboards and real-time analytics. Track compliance status across all departments, identify gaps instantly, and make data-driven decisions.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Drive Business Growth",
      description: "Build compliance into your competitive strategy—accelerate market entry, win enterprise deals, and expand into regulated industries with confidence. Position your organization as a trusted, compliant leader.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Star,
      title: "Build Trust & Reputation",
      description: "Demonstrate commitment to governance and ethical business practices to customers, partners, and stakeholders. Strong compliance reputation opens doors to premium partnerships and enterprise opportunities.",
      gradient: "from-red-500 to-rose-500"
    }
  ];

  return (
    <section id="benefits" className="py-12 md:py-16 relative overflow-hidden">
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative glass-strong rounded-2xl p-6 md:p-8 h-full overflow-hidden">
                  {/* Icon background glow */}
                  <motion.div
                    className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.gradient}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
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
