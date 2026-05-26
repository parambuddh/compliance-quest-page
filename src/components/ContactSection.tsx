import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRecaptcha } from "../hooks/useRecaptcha";
 
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { loadRecaptcha, executeRecaptcha } = useRecaptcha();

  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // trigger load 200px before the map container scrolls into view
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Validation rules for each field
  const validateField = (name: string, value: string): string => {
    const trimmedValue = value.trim();
    
    switch (name) {
      case "name":
        if (!trimmedValue) return "Name is required";
        if (trimmedValue.length < 2) return "Name must be at least 2 characters";
        if (trimmedValue.length > 50) return "Name must not exceed 50 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
        return "";
      
      case "email":
        if (!trimmedValue) return "Email is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)) return "Please enter a valid email address";
        if (trimmedValue.length > 100) return "Email is too long";
        return "";
      
      case "phone": {
        const phoneDigits = value.replace(/[^\d]/g, "");
        if (!phoneDigits) return "Phone number is required";
        if (phoneDigits.length < 7) return "Phone number must be at least 7 digits";
        if (phoneDigits.length > 15) return "Phone number must not exceed 15 digits";
        if (!/^\d+$/.test(phoneDigits)) return "Phone number can only contain digits";
        return "";
      }
      
      case "message":
        if (trimmedValue.length > 1000) return "Message must not exceed 1000 characters";
        return "";
      
      default:
        return "";
    }
  };

  // Field order for progressive validation
  const fieldOrder = ["name", "email", "phone", "message"];

  // Get the index of a field in the order
  const getFieldIndex = (fieldName: string) => fieldOrder.indexOf(fieldName);

  // Real-time validation on blur (when clicking outside)
  const handleBlur = (name: string) => {
    const newTouched = { ...touched, [name]: true };
    setTouched(newTouched);
    
    // On blur, validate current field and all fields above it (only show errors for touched fields)
    validateUpToField(name, newTouched);
  };

  // Validate up to and including the given field (progressive validation)
  const validateUpToField = (fieldName: string, touchedState: Record<string, boolean>) => {
    const e: Record<string, string> = {};
    const currentIndex = getFieldIndex(fieldName);
    
    // Validate only fields up to and including the current field
    fieldOrder.forEach((key, index) => {
      if (index <= currentIndex) {
        const error = validateField(key, form[key as keyof typeof form]);
        if (error) {
          e[key] = error;
        }
      }
    });
    
    setErrors(e);
  };

  // Validate all fields and return all errors (for submit)
  const validateAllFields = () => {
    const e: Record<string, string> = {};
    
    // Always validate all fields on submit
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof typeof form]);
      if (error) {
        e[key] = error;
      }
    });
    
    setErrors(e);
    return e;
  };
 
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    // Mark all fields as touched to show all errors
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    // Validate all fields
    const validationErrors = validateAllFields();
    
    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) return;
    
    setIsSubmitting(true);
    try {
      const token = await executeRecaptcha("contact_form");
      const API_URL = import.meta.env.VITE_CONTACT_API_URL || "/api/contact.php";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptcha_token: token, source_url: window.location.href }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Failed to send message");
      setSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const inputClass = (name: string) =>
    `w-full px-4 py-2.5 rounded-md border transition-colors text-sm focus:outline-none focus:ring-2 disabled:opacity-50 ${
      touched[name] && errors[name]
        ? "border-red-500 bg-red-50 focus:ring-red-500/30 focus:border-red-500"
        : "border-slate-200 bg-white focus:ring-[#37C643]/30 focus:border-[#37C643]"
    } text-slate-900`;
 
  return (
    <section
      id="contact"
      className="pt-16 md:pt-24 pb-9 bg-gradient-to-br from-teal-50/40 via-white to-green-50/30"
      style={{ position: "relative" }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" style={{ zIndex: 0 }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100/20 rounded-full blur-3xl" style={{ zIndex: 0 }} />
 
      <div className="container mx-auto px-4 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 mt-4">Contact Us</h2>
          <p className="text-slate-600 text-lg">Have questions or want to learn more? Reach out and we'll get back to you promptly.</p>
        </motion.div>
 
        {/*
          TWO-COLUMN LAYOUT
          - Flex (not grid) so sticky works reliably
          - Left div: position sticky, top 96px, alignSelf flex-start
          - Right div: flex 1, scrolls normally
        */}
        <div
          className="mx-auto mb-8 max-w-6xl"
          style={{ display: "flex", flexDirection: "row", gap: "3rem", alignItems: "flex-start" }}
        >
 
          {/* ── LEFT: STICKY Quick Contact ── */}
          <div
            className="hidden md:block space-y-6"
            style={{
              width: "40%",
              flexShrink: 0,
              position: "sticky",
              top: "96px",
              alignSelf: "flex-start",
            }}
          >
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Quick Contact</h3>
              <p className="text-slate-600 text-sm mb-6">
                Get in touch with a representative to see a demo or simply learn more about the product.
              </p>
 
              <div className="space-y-4 w-full">
                {/* Address */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2040+Martin+Ave,+Santa+Clara,+CA+95050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#37C643]/40 bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg text-white flex items-center justify-center shrink-0" style={{ backgroundColor: "#37C643" }}>
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">Address</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mt-1">
                      2040 Martin Ave, Santa Clara, CA 95050<br />United States
                    </p>
                  </div>
                </a>
 
                {/* Phone */}
                <a
                  href="tel:+16697776838"
                  className="flex items-center gap-4 p-5 rounded-xl border border-[#37C643]/40 bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-lg text-white flex items-center justify-center shrink-0" style={{ backgroundColor: "#37C643" }}>
                    <Phone size={20} />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="font-semibold text-slate-900 text-sm">Phone</p>
                    <p className="text-sm font-medium text-slate-600 mt-1 group-hover:text-[#37C643] transition-colors duration-300 relative inline-block">
                      1.669.777.6838
                      <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "#37C643" }} />
                    </p>
                  </div>
                </a>
 
                {/* Email */}
                <a
                  href="mailto:info@ardira.com"
                  className="flex items-center gap-4 p-5 rounded-xl border border-[#37C643]/40 bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-lg text-white flex items-center justify-center shrink-0" style={{ backgroundColor: "#37C643" }}>
                    <Mail size={20} />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="font-semibold text-slate-900 text-sm">Email</p>
                    <p className="text-sm font-medium text-slate-600 mt-1 group-hover:text-[#37C643] transition-colors duration-300 relative inline-block">
                      info@ardira.com
                      <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "#37C643" }} />
                    </p>
                  </div>
                </a>
 
                {/* Support */}
                <a
                  href="mailto:support@ardira.com"
                  className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50 shadow-sm cursor-pointer hover:bg-[#37C643]/5 hover:border-[#37C643]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 text-lg font-bold" style={{ backgroundColor: "#37C643" }}>?</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">For customer support,</span> email us directly at{" "}
                      <span className="font-medium relative inline-block" style={{ color: "#37C643" }}>
                        support@ardira.com
                        <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "#37C643" }} />
                      </span>
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
 
          {/* ── RIGHT: SCROLLS — Form ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-14 md:py-20 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "#37C64315", border: "2px solid #37C643" }}
                  >
                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.3 }}>
                      <CheckCircle size={40} style={{ color: "#37C643" }} />
                    </motion.div>
                  </motion.div>
 
                  <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }}
                    className="font-bold text-slate-900 text-xl md:text-2xl mb-2">
                    Message Sent Successfully!
                  </motion.h3>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.3 }}
                    className="text-slate-600 text-sm md:text-base text-center max-w-md px-6 mb-2">
                    Thank you for reaching out! We've received your message and a confirmation has been sent to your email.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.3 }}
                    className="text-slate-500 text-xs text-center max-w-sm px-6 mb-8">
                    Our team will get back to you within 24 hours.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.3 }}
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border font-semibold text-sm transition-colors hover:bg-[#37C643]/5"
                    style={{ borderColor: "#37C643", color: "#37C643" }}
                  >
                    Send Another Message <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-4 md:p-8 space-y-5 shadow-sm">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Fill out the form and we'll be in touch shortly!</h3>
                    <p className="text-xs text-slate-500">Note: fields marked with <span className="text-red-500">(*)</span> are mandatory</p>
                  </div>
 
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Name<span className="text-red-500">*</span></label>
                    <input type="text" disabled={isSubmitting} value={form.name} onFocus={loadRecaptcha}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); if (touched.name) validateUpToField("name", touched); }}
                      onBlur={() => handleBlur("name")}
                      className={inputClass("name")} placeholder="Enter your name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>✕</span>{errors.name}</p>}
                  </div>
 
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email<span className="text-red-500">*</span></label>
                    <input type="email" disabled={isSubmitting} value={form.email} onFocus={loadRecaptcha}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); if (touched.email) validateUpToField("email", touched); }}
                      onBlur={() => handleBlur("email")}
                      className={inputClass("email")} placeholder="Enter your email" />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>✕</span>{errors.email}</p>}
                  </div>
 
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone<span className="text-red-500">*</span></label>
                    <input type="tel" disabled={isSubmitting} value={form.phone} onFocus={loadRecaptcha}
                      onChange={(e) => { const n = e.target.value.replace(/[^\d]/g, ""); setForm({ ...form, phone: n }); if (touched.phone) validateUpToField("phone", touched); }}
                      onBlur={() => handleBlur("phone")}
                      className={inputClass("phone")} placeholder="Enter your phone number" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>✕</span>{errors.phone}</p>}
                  </div>
 
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea rows={5} disabled={isSubmitting} value={form.message} onFocus={loadRecaptcha}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); if (touched.message) validateUpToField("message", touched); }}
                      onBlur={() => handleBlur("message")}
                      className={`w-full px-4 py-2.5 rounded-md border transition-colors text-sm focus:outline-none focus:ring-2 resize-none disabled:opacity-50 ${
                        errors.message
                          ? "border-red-500 bg-red-50 focus:ring-red-500/30 focus:border-red-500"
                          : "border-slate-200 bg-white focus:ring-[#37C643]/30 focus:border-[#37C643]"
                      } text-slate-900`}
                      placeholder="Let's talk! Tell us about yourself." />
                    {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>✕</span>{errors.message}</p>}
                    <p className="text-xs text-slate-400 mt-1">{form.message.length}/1000 characters</p>
                  </div>
 
                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-3 rounded-md text-white font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-85"
                    style={{ backgroundColor: "#37C643" }}>
                    <Send size={16} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
 
                  {errors["form"] && (
                    <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-md px-4 py-2.5">{errors["form"]}</p>
                  )}
 
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We're committed to your privacy. ComplianceVista uses the information you provide us to contact you about relevant content, products and services. You may unsubscribe from these communications at any time. For information, check out our{" "}
                    <a href="/privacy-policy" className="font-medium hover:underline" style={{ color: "#37C643" }}>Privacy Policy</a>.
                  </p>
 
                  {/* Map */}
                  <div ref={mapRef} className="mt-6 rounded-xl overflow-hidden border border-slate-200" style={{ height: "250px" }}>
                    {isMapVisible ? (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6342.08172427285!2d-121.96206399999998!3d37.36521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca3b29bd16bd%3A0x1b7e4bbf55b3700b!2s2040%20Martin%20Ave%2C%20Santa%20Clara%2C%20CA%2095050%2C%20USA!5e0!3m2!1sen!2sin!4v1775548501571!5m2!1sen!2sin"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" title="Office Location" />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm">
                        <div className="w-6 h-6 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                        <span>Loading interactive map...</span>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
 
        </div>
      </div>
    </section>
  );
};
 
export default ContactSection;