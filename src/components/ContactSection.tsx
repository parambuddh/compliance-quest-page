import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "", demo: false });
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
    setForm({ name: "", company: "", email: "", phone: "", message: "", demo: false });
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

        <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Full Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="John Doe" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Company</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass("company")} placeholder="Acme Inc." />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} placeholder="john@company.com" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass("phone")} placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Message *</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={inputClass("message")} placeholder="Tell us about your compliance needs..." />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>

            <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer group">
              <input
                type="checkbox"
                checked={form.demo}
                onChange={(e) => setForm({ ...form, demo: e.target.checked })}
                className="w-5 h-5 rounded-md border-border/50 accent-primary"
              />
              <span className="group-hover:text-foreground transition-colors">I'm interested in a product demo</span>
            </label>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-hover text-primary-foreground py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-6 space-y-5">
              {[
                { icon: Mail, label: "demo@ardira.com", href: "mailto:demo@ardira.com" },
                { icon: Phone, label: "+1 (669) 777-6838", href: "tel:+16697776838" },
                { icon: MapPin, label: "Ardira Technologies", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center hover:from-primary hover:to-secondary hover:text-primary-foreground text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Social link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
