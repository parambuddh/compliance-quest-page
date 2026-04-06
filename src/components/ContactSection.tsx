import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    toast.success("Thank you! We'll be in touch shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  const inputClass = (name: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-foreground bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white/80 transition-all duration-300 ${
      errors[name] ? "border-destructive" : "border-border/50"
    }`;

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">Get in Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-10 gap-12 max-w-5xl mx-auto">
          {/* Form - 60% */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="md:col-span-6 glass-strong rounded-2xl p-8 space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Your Name (Required)</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="John Doe" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Your Email (Required)</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} placeholder="john@company.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Subject</label>
              <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass("subject")} placeholder="How can we help?" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Your Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} className={inputClass("message")} placeholder="Tell us about your compliance needs..." />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </motion.form>

          {/* Quick Connect - 40% */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 space-y-6"
          >
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="font-bold text-foreground uppercase tracking-wider text-sm mb-6">
                Reach Out to Us for Confidential Inquiry
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-foreground mb-3">US HQ</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <p>2040 Martin Ave</p>
                      <p>Santa Clara, CA 95050</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>

                <a href="tel:+16697776838" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">1.669.777.6838</span>
                </a>

                <a href="mailto:info@ardira.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-primary group-hover:text-primary/80 transition-colors">info (at) ardira.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
