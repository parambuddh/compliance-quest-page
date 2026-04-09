import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// reCAPTCHA V3 Configuration
const RECAPTCHA_SITE_KEY = "6LdpZq4sAAAAACc87ym0oRUjKpiJ5nIsi_LWPxTh"; // Official site key

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[\d\s\-+()]+$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Execute reCAPTCHA V3
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "contact_form"
      });

      // Here you would typically send the token to your backend for verification
      // For now, we'll simulate the submission
      console.log("reCAPTCHA Token:", token);

      // Simulate backend verification delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success("Thank you! We'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-foreground bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white/80 transition-all duration-300 ${
      errors[name] ? "border-destructive" : "border-border/50"
    }`;

  return (
    <section id="contact" className="py-10 md:py-14 relative overflow-hidden">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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

        {/* Two Column Layout - Form Left (Sticky), Map + Info Right (Scrollable) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto md:min-h-screen">
          {/* Form - Left Side - Sticky Position, Static Size */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="sticky top-20 glass-strong rounded-2xl p-6 md:p-8 space-y-4 h-fit flex flex-col"
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
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Phone (Required)</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass("phone")} placeholder="Enter your phone number" />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>

            <div className="flex-grow">
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">Your Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={8} className={`${inputClass("message")} resize-none h-32 md:h-48`} placeholder="Tell us about your compliance needs..." />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 mt-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Send"}
            </button>

            {/* reCAPTCHA Badge Notice */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              This site is protected by reCAPTCHA and the Google
              <br />
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms of Service</a> apply.
            </p>
          </motion.form>

          {/* Right Side - Info on Top, Map Below - Scrollable on Mobile, Auto Height on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 flex flex-col md:overflow-y-auto md:max-h-[calc(100vh-80px)] scrollbar-hide"
          >
            {/* Contact Info Box - TOP */}
            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                Quick Contact
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Get in touch with a SurveyVista representative to see a demo or simply learn more about our products.
              </p>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/8 hover:to-secondary/8 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <p className="font-bold text-foreground">2040 Martin Ave, Santa Clara, CA</p>
                    <p className="text-muted-foreground">95050 United States</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/8 hover:to-secondary/8 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">1.669.777.6838</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/8 hover:to-secondary/8 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">info@surveyvista.com</span>
                </div>

                {/* Support Note */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/8 hover:to-secondary/8 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">?</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">For customer support, email us directly at</p>
                    <p><span className="text-foreground font-bold">support@ardira.com</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps - BOTTOM */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary/20 flex-grow" style={{ minHeight: "300px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6342.08172427285!2d-121.96206399999998!3d37.36521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca3b29bd16bd%3A0x1b7e4bbf55b3700b!2s2040%20Martin%20Ave%2C%20Santa%20Clara%2C%20CA%2095050%2C%20USA!5e0!3m2!1sen!2sin!4v1775548501571!5m2!1sen!2sin"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ComplianceVista Office - Santa Clara, CA"
                style={{ border: "none", minHeight: "300px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
