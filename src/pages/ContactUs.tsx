import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-surface-light to-background">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Contact our team to schedule a demo or learn more about ComplianceVista's solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information Cards */}
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "1.669.777.6838",
                href: "tel:1.669.777.6838",
              },
              {
                icon: Mail,
                title: "Email",
                content: "support@ardira.com",
                href: "mailto:support@ardira.com",
              },
              {
                icon: MapPin,
                title: "Address",
                content: "2040 Martin Ave, Santa Clara, CA 95050",
                href: "https://maps.google.com/?q=2040+Martin+Ave+Santa+Clara+CA+95050",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {item.content}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 border border-primary/20"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-600/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-600/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-600/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us what you'd like to discuss..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-600/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 mt-6"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 border border-primary/20 overflow-hidden"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Location</h2>
              <div className="rounded-lg overflow-hidden h-96">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: "none", display: "block" }}
                  loading="lazy"
                  allowFullScreen=""
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.5842693803393!2d-121.97789!3d37.35411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccf7d8b5e5e5%3A0x5d9e5e5e5e5e5e5e!2s2040%20Martin%20Ave%2C%20Santa%20Clara%2C%20CA%2095050!5e0!3m2!1sen!2sus!4v1234567890"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default ContactUs;
