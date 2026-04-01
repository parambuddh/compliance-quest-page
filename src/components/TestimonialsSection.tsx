import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Compliance Vista transformed how we manage governance. The automation alone saved our team 20+ hours weekly. It's become indispensable to our compliance operations.",
    name: "Jane Smith",
    title: "Compliance Officer",
    company: "Tech Corp",
    avatar: "JS",
  },
  {
    quote: "Finally, a native Salesforce solution that works. The audit trails are comprehensive and easy to extract. Our auditors love it and preparation time dropped by 60%.",
    name: "Michael Chen",
    title: "Risk Manager",
    company: "Finance Inc.",
    avatar: "MC",
  },
  {
    quote: "Excellent support and the interface is intuitive. Our team adopted it immediately with minimal training. The ROI was evident within the first quarter of implementation.",
    name: "Sarah Williams",
    title: "Internal Audit Lead",
    company: "Healthcare Systems",
    avatar: "SW",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 mesh-bg" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-4">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          Trusted by Enterprise Leaders
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group glass-strong rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 relative"
          >
            {/* Quote icon */}
            <div className="absolute -top-3 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <Quote className="w-4 h-4 text-primary-foreground" />
            </div>

            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed">"{t.quote}"</p>

            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {t.avatar}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
