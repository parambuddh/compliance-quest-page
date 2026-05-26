import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import CalendlyModal from "./CalendlyModal";

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section ref={sectionRef} id="final-cta" className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-[#26C64F]">
      {/* Single animated orb - subtle effect */}
      <motion.div
        className="absolute bottom-20 right-[15%] w-80 h-80 bg-white/5 rounded-full blur-3xl"
        animate={{
          y: [0, 40, -40, 0],
          x: [0, -30, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle glow layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container relative text-center max-w-3xl mx-auto z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            Ready to Simplify Enterprise Compliance?
          </h2>
          <p className="relative text-white/90 mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md">
            Join 500+ enterprise customers managing compliance with confidence.
          </p>

          {/* Buttons container */}
          <motion.div
            className="relative flex flex-col sm:flex-row flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Primary Button */}
            <motion.button
              onClick={() => setIsCalendlyOpen(true)}
              className="group relative px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base overflow-hidden shadow-lg bg-white text-[#26C64F] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative flex items-center justify-center gap-2 font-bold">
                <span>Request a Demo</span>
                <ArrowRight className="w-5 h-5" />
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
