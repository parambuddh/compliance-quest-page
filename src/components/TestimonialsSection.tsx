import { Star, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    quote: "Compliance Vista transformed how we manage governance. The automation alone saved our team 20+ hours weekly. It's become indispensable to our compliance operations.",
    name: "Jane Smith",
    title: "Compliance Officer",
    company: "Tech Corp",
  },
  {
    quote: "Finally, a native Salesforce solution that works. The audit trails are comprehensive and easy to extract. Our auditors love it and preparation time dropped by 60%.",
    name: "Michael Chen",
    title: "Risk Manager",
    company: "Finance Inc.",
  },
  {
    quote: "Excellent support and the interface is intuitive. Our team adopted it immediately with minimal training. The ROI was evident within the first quarter of implementation.",
    name: "Sarah Williams",
    title: "Internal Audit Lead",
    company: "Healthcare Systems",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-14">
        Trusted by Enterprise Leaders
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-surface-light rounded-lg p-6 border-t-[3px] border-primary relative">
            <div className="absolute -top-4 left-4 bg-primary rounded-full w-8 h-8 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex gap-0.5 mb-4 mt-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic mb-4">"{t.quote}"</p>
            <p className="font-bold text-foreground text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
