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
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Determine if we're on an independent page (not the home page)
  const isIndependentPage = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 300);
      
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

      // Reliable scroll-based section detection
      if (!isIndependentPage) {
        // Evaluate in reverse order (bottom to top) to find the deepest section currently in view
        const sectionIds = ["final-cta", "contact", "faq", "use-cases", "benefits", "features", "overview", "home"];
        let currentSection = "home";
        
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // 200px defines the "trigger line" from the top of the viewport.
            // When a section's top crosses above this line, it becomes active.
            // We use 200 to account for navbar height and some buffer.
            if (rect.top <= 200) {
              currentSection = id;
              break;
            }
          }
        }

        // Map sections that don't have a direct navbar link to the closest relevant link
        if (currentSection === "faq") {
          currentSection = "use-cases";
        } else if (currentSection === "final-cta") {
          currentSection = "contact";
        }

        // Special case: if scrolled to the absolute bottom
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
          // Find the last actual nav link to highlight
          const navIds = ["contact", "use-cases", "benefits", "features", "overview", "home"];
          for (const id of navIds) {
             if (document.getElementById(id)) {
                currentSection = id;
                break;
             }
          }
        }

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Trigger once on mount to handle initial scroll position correctly on page load/refresh
    setTimeout(onScroll, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isIndependentPage]);

  const handleClick = (href: string) => {
    // Small delay to ensure the click/touch event is fully registered before we collapse the UI
    setTimeout(() => setMobileOpen(false), 150);
    
    // Manual scroll calculation for pixel-perfect offset (120px buffer)
    const scrollToSection = (targetId: string) => {
      const element = document.querySelector(targetId);
      if (element) {
        const offset = 120; // Matches our scroll-padding-top
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    // If on an independent page and clicking a section link, navigate to home first then scroll
    if (isIndependentPage && href.startsWith("#")) {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(href), 100);
    } else if (href.startsWith("#")) {
      // Manually set active section on click for immediate feedback
      setActiveSection(href.slice(1));
      scrollToSection(href);
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (isIndependentPage) {
      navigate("/");
    } else {
      setTimeout(() => setMobileOpen(false), 150);
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
              width={180}
              height={40}
              className={`transition-all duration-500 h-10 w-auto ${!scrolled ? "" : isOverColoredSection ? "brightness-150" : ""}`}
            />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                aria-label={`Navigate to ${link.label} section`}
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
              aria-label="Book a product demo"
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
            className={`md:hidden overflow-hidden backdrop-blur-xl border-t transition-all duration-500 shadow-[0_12px_48px_rgba(0,0,0,0.15)] ${
              scrolled
                ? "mx-4 md:mx-8 mt-1 rounded-b-[2.5rem] bg-white/60 border-white/40"
                : "bg-white/60 border-white/20"
            }`}
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  aria-label={`Navigate to ${link.label} section`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
                  className={`text-left py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                    !isIndependentPage && activeSection === link.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-slate-800 hover:bg-slate-800/5"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  setTimeout(() => setMobileOpen(false), 150);
                  setIsCalendlyOpen(true);
                }}
                aria-label="Book a product demo"
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
        {scrolled && showScrollTop && (
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
