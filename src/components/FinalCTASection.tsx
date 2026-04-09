import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import CalendlyModal from "./CalendlyModal";

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Very subtle darkening - preserves vibrant brand colors
  const darkOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.15]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="final-cta" className="py-12 md:py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-secondary" />

      {/* Progressive dark overlay - darkens as user scrolls through section */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: darkOverlay }}
      />

      {/* Single animated orb - subtle effect */}
      <motion.div
        className="absolute bottom-20 right-[15%] w-80 h-80 bg-white/10 rounded-full blur-3xl"
        animate={{
          y: [0, 40, -40, 0],
          x: [0, -30, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle glow layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-secondary/8 via-transparent to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="container relative text-center max-w-3xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Ready to Simplify Enterprise Compliance?
          </h2>
          <p className="relative text-white/85 mb-10 text-base md:text-lg leading-relaxed drop-shadow-md">
            Join 500+ enterprise customers managing compliance with confidence.
          </p>

          {/* Buttons container */}
          <motion.div
            className="relative flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Primary Button */}
            <motion.button
              onClick={() => setIsCalendlyOpen(true)}
              className="group relative px-8 py-4 rounded-full font-semibold text-base overflow-hidden shadow-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Content */}
              <div className="relative flex items-center gap-2 font-bold drop-shadow-sm">
                <span>Request a Demo</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              onClick={() => scrollTo("contact")}
              className="group relative px-8 py-4 rounded-full font-semibold text-base overflow-hidden shadow-xl bg-transparent border-2 border-white text-white hover:shadow-lg hover:shadow-white/30 transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Content */}
              <div className="relative font-bold drop-shadow-sm">
                Schedule a Call
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </section>
  );
};

export default FinalCTASection;
