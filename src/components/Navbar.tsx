import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/ComplianceVista-logo.svg";
import CalendlyModal from "./CalendlyModal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOverColoredSection, setIsOverColoredSection] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Determine if we're on an independent page (not the home page)
  const isIndependentPage = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect if navbar is over a colored section (green sections)
      const finalCtaElement = document.getElementById("final-cta");
      const heroElement = document.getElementById("home");
      
      let overColored = false;
      
      // Check if over Final CTA (green section at bottom)
      if (finalCtaElement) {
        const finalCtaRect = finalCtaElement.getBoundingClientRect();
        if (finalCtaRect.top < 100 && finalCtaRect.bottom > 0) {
          overColored = true;
        }
      }
      
      // Check if over Hero (green section at top) - only when scrollY is very small
      if (!overColored && heroElement && window.scrollY <= 50) {
        overColored = true;
      }
      
      setIsOverColoredSection(overColored);
    };

    // Use Intersection Observer for active section detection (High Performance)
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (!isIndependentPage) {
      const sections = ["home", "overview", "features", "benefits", "use-cases", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [isIndependentPage]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    
    // If on an independent page and clicking a section link, navigate to home first then scroll
    if (isIndependentPage && href.startsWith("#")) {
      navigate("/", { replace: false });
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (href.startsWith("#")) {
      // On home page, just scroll
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (isIndependentPage) {
      navigate("/");
    } else {
      handleClick("#home");
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div
        className={`container transition-all duration-500 ${
          scrolled
            ? isOverColoredSection
              ? "mt-3 rounded-[2.5rem] bg-slate-900/80 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.5)] border border-slate-600/50"
              : "mt-3 rounded-[2.5rem] bg-white/50 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.25)] border border-white/40"
            : "mt-0 rounded-none bg-transparent"
        }`}
      >
        <nav
          className={`container flex items-center justify-between transition-all duration-500 h-20`}
        >
          <button
            onClick={handleLogoClick}
            aria-label="Compliance Vista - Return to Home"
            className="flex items-center gap-2 transition-all duration-500"
          >
            <img
              src={logo}
              alt="Compliance Vista"
              className={`transition-all duration-500 h-10 ${!scrolled ? "" : isOverColoredSection ? "brightness-150" : ""}`}
            />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isIndependentPage
                    ? !scrolled
                      ? "text-slate-800 hover:text-slate-900 hover:bg-slate-800/5"
                      : "text-foreground hover:text-foreground hover:bg-primary/5"
                    : !scrolled
                    ? activeSection === link.href.slice(1)
                      ? "text-slate-900"
                      : "text-slate-800 hover:text-slate-900 hover:bg-slate-800/5"
                    : activeSection === link.href.slice(1)
                    ? isOverColoredSection
                      ? "text-white"
                      : "text-primary"
                    : isOverColoredSection
                    ? "text-white hover:text-white hover:bg-white/10"
                    : "text-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {link.label}
                {!isIndependentPage && activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className={`ml-4 ${
                !scrolled
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
              } rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 ${
                scrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-sm"
              }`}
            >
              Book Demo
            </button>
          </div>

          <button
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              !scrolled
                ? "bg-slate-100/50 text-slate-900 hover:bg-slate-200/50"
                : isOverColoredSection
                ? "bg-white/30 text-white hover:bg-white/40"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden overflow-hidden backdrop-blur-xl border-t transition-all duration-500 ${
              scrolled
                ? isOverColoredSection
                  ? "mx-4 md:mx-8 mt-1 rounded-b-[2.5rem] bg-slate-900/80 border-slate-600/50 shadow-[0_12px_48px_rgba(0,0,0,0.5)]"
                  : "mx-4 md:mx-8 mt-1 rounded-b-[2.5rem] bg-white/40 border-white/40 shadow-[0_12px_48px_rgba(0,0,0,0.25)]"
                : isOverColoredSection
                ? "bg-slate-900/80 border-slate-600/50 shadow-[0_12px_48px_rgba(0,0,0,0.5)]"
                : "bg-white/40 border-white/40 shadow-[0_12px_48px_rgba(0,0,0,0.25)]"
            }`}
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
                  className={`text-left py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                    !isIndependentPage && activeSection === link.href.slice(1)
                      ? isOverColoredSection
                        ? "text-white bg-white/10"
                        : !scrolled
                        ? "text-slate-900 bg-slate-800/5"
                        : "text-primary bg-primary/5"
                      : isOverColoredSection
                      ? "text-white/60"
                      : !scrolled
                      ? "text-slate-800"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  setMobileOpen(false);
                  setIsCalendlyOpen(true);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.3, ease: "easeOut" }}
                className={`${
                  !scrolled
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                } px-5 py-3 rounded-xl text-sm font-semibold mt-2`}
              >
                Book Demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button - Fixed Position */}
      <AnimatePresence>
        {scrolled && window.scrollY > 300 && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </motion.header>
  );
};

export default Navbar;
