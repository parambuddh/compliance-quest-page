import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["contact", "features", "overview", "home"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-white/30"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <button onClick={() => handleClick("#home")} className="flex items-center gap-2.5 font-heading text-xl font-bold">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">CV</span>
          </div>
          <span className="gradient-text">Compliance Vista</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              )}
            </button>
          ))}
          <button
            onClick={() => handleClick("#contact")}
            className="ml-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            Book Demo
          </button>
        </div>

        <button
          className="md:hidden w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/80 backdrop-blur-2xl border-t border-white/30"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`text-left py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleClick("#contact")}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold mt-2"
              >
                Book Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
