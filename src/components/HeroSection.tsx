import { Shield, ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden mesh-bg">
      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-primary/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-secondary/8 rounded-full blur-3xl float-animation" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-primary/5 rounded-full blur-2xl float-animation" style={{ animationDelay: "1.5s" }} />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground/80 font-medium">Salesforce-Native Solution</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground">
              <span className="gradient-text">Compliance Vista:</span>{" "}
              <br />
              Enterprise Governance{" "}
              <span className="relative inline-block">
                Simplified
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="hsl(168 76% 42%)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Streamline compliance workflows, ensure governance adherence, and
              manage risk directly within Salesforce.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="group relative bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="relative z-10">Request Demo</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => scrollTo("overview")}
                className="glass px-8 py-4 rounded-2xl font-semibold text-foreground hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Learn More ↓
              </button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {["100% Native Salesforce", "Enterprise Security", "Real-time Tracking"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground glass rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero graphic - glassmorphism dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl scale-110" />

              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl glass-strong p-6 float-animation">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="h-2.5 w-24 bg-foreground/15 rounded-full" />
                    <div className="h-2 w-16 bg-foreground/10 rounded-full mt-1.5" />
                  </div>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { v: "92%", l: "Compliance", c: "from-primary/20 to-primary/5" },
                    { v: "87%", l: "Audit Ready", c: "from-secondary/20 to-secondary/5" },
                    { v: "95%", l: "Risk Score", c: "from-primary/15 to-secondary/10" },
                  ].map((item, i) => (
                    <div key={i} className={`bg-gradient-to-br ${item.c} rounded-xl p-3 text-center backdrop-blur-sm border border-white/30`}>
                      <span className="text-lg font-bold gradient-text">{item.v}</span>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{item.l}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[85, 72, 93].map((w, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Policy {i + 1}</span>
                        <span>{w}%</span>
                      </div>
                      <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ duration: 1.2, delay: 0.8 + i * 0.2 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-2 glow-primary"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Compliant</p>
                  <p className="text-[10px] text-muted-foreground">All checks passed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
