import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTASection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-secondary" />

      {/* Floating orbs for depth */}
      <div className="absolute top-10 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="container relative text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
            Ready to Simplify Enterprise Compliance?
          </h2>
          <p className="text-primary-foreground/70 mb-10 text-lg">
            Join 500+ enterprise customers managing compliance with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="group bg-white/95 backdrop-blur text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-black/20 flex items-center gap-2"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="glass-dark text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              Schedule a Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
