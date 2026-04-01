import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import { toast } from "sonner";

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

  const field = (name: keyof typeof form, label: string, type = "text", isTextarea = false) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1">{label}</label>
      {isTextarea ? (
        <textarea
          value={form[name] as string}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          rows={4}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition ${errors[name] ? "border-destructive" : "border-border"}`}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          value={form[name] as string}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition ${errors[name] ? "border-destructive" : "border-border"}`}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      )}
      {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {field("name", "Full Name")}
            {field("company", "Company Name")}
            {field("email", "Email", "email")}
            {field("phone", "Phone", "tel")}
            {field("message", "Message", "text", true)}
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={form.demo}
                onChange={(e) => setForm({ ...form, demo: e.target.checked })}
                className="accent-primary w-4 h-4"
              />
              I'm interested in a product demo
            </label>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors shadow"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:demo@ardira.com" className="text-secondary hover:text-primary transition-colors">demo@ardira.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+16697776838" className="text-secondary hover:text-primary transition-colors">+1 (669) 777-6838</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Ardira Technologies</span>
            </div>
            <div className="flex gap-4 pt-4">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-primary hover:text-primary-hover transition-colors" aria-label="Social link">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
