import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/ComplianceVista-logo.svg";
import CalendlyModal from "./CalendlyModal";

const navLinks = [
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
  const [isButtonOverColoredSection, setIsButtonOverColoredSection] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isIndependentPage = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 300);

      const finalCtaElement = document.getElementById("final-cta");
      const heroElement = document.getElementById("home");
      const footerElement = document.querySelector("footer");

      let overColored = false;
      let buttonOverColored = false;

      // Define the physical absolute space occupied by the Navbar and the Button
      const navbarAbsoluteBottom = window.scrollY + 80; // Navbar bottom edge
      const buttonAbsoluteTop = window.scrollY + window.innerHeight - 72;
      const buttonAbsoluteBottom = window.scrollY + window.innerHeight - 24;

      if (finalCtaElement) {
        const ctaRect = finalCtaElement.getBoundingClientRect();
        const ctaAbsoluteTop = window.scrollY + ctaRect.top;
        const ctaAbsoluteBottom = window.scrollY + ctaRect.bottom;
        
        if (ctaAbsoluteTop < navbarAbsoluteBottom && ctaAbsoluteBottom > window.scrollY) overColored = true;
        if (ctaAbsoluteTop < buttonAbsoluteBottom && ctaAbsoluteBottom > buttonAbsoluteTop) buttonOverColored = true;
      }

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const footerAbsoluteTop = window.scrollY + footerRect.top;
        const footerAbsoluteBottom = window.scrollY + footerRect.bottom;

        if (footerAbsoluteTop < navbarAbsoluteBottom && footerAbsoluteBottom > window.scrollY) overColored = true;
      }

      if (!overColored && heroElement && window.scrollY <= 50) {
        overColored = true;
      }

      setIsOverColoredSection(overColored);
      setIsButtonOverColoredSection(buttonOverColored);

      if (!isIndependentPage) {
        const sectionIds = ["final-cta", "contact", "faq", "use-cases", "benefits", "features", "overview", "home"];
        let currentSection = "home";

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              currentSection = id;
              break;
            }
          }
        }

        if (currentSection === "faq") {
          currentSection = "use-cases";
        } else if (currentSection === "final-cta") {
          currentSection = "contact";
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
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
    setTimeout(onScroll, 100);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isIndependentPage]);

  const handleClick = (href: string) => {
    setTimeout(() => setMobileOpen(false), 150);

    const scrollToSection = (targetId: string) => {
      const element = document.querySelector(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };

    if (isIndependentPage && href.startsWith("#")) {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(href), 100);
    } else if (href.startsWith("#")) {
      setActiveSection(href.slice(1));
      scrollToSection(href);
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (isIndependentPage) {
      navigate("/", { replace: false });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        <nav className="container flex items-center justify-between transition-all duration-500 h-20">
          <button
            onClick={handleLogoClick}
            aria-label="ComplianceVista - Return to Home"
            className="flex items-center gap-2 transition-all duration-500"
          >
            <img
              src={logo}
              alt="ComplianceVista"
              width={180}
              height={40}
              className={`transition-all duration-500 h-10 w-auto ${!scrolled ? "" : isOverColoredSection ? "brightness-150" : ""}`}
            />
          </button>

          <div className="hidden lg:flex items-center gap-1">
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
                      ? "text-[#37C643]"
                      : "text-slate-800 hover:text-slate-900 hover:bg-slate-800/5"
                    : activeSection === link.href.slice(1)
                    ? "text-[#37C643]"
                    : isOverColoredSection
                    ? "text-white hover:text-white hover:bg-white/10"
                    : "text-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => setIsCalendlyOpen(true)}
              aria-label="Book a product demo"
              className={`ml-4 bg-[#37C643] text-white rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-lg hover:shadow-[#37C643]/30 transition-all duration-300 ${
                scrolled ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-sm"
              }`}
            >
              Book Demo
            </button>
          </div>

          {/* ✅ Changed lg:hidden to lg:hidden — hamburger shows on iPad (md) and below */}
          <button
            className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              !scrolled
                ? "bg-slate-100/50 text-slate-900 hover:bg-slate-200/50"
                : isOverColoredSection
                ? "bg-white/30 text-white hover:bg-white/40"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
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
            className={`lg:hidden overflow-hidden transition-shadow duration-500 shadow-[0_12px_48px_rgba(0,0,0,0.15)] ${
              scrolled ? "mx-4 md:mx-8 mt-2 rounded-b-[2rem]" : ""
            }`}
          >
            <div
              className={`backdrop-blur-xl w-full h-full transition-colors duration-500 ${
                scrolled
                  ? "rounded-b-[2rem] bg-white border border-t-0 border-white/40"
                  : "bg-white border-b border-white/20"
              }`}
            >
              {/* ✅ Removed duplicate "container" class — was preventing clicks on iPad */}
              <div className="px-4 py-4 flex flex-col gap-1">
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
                        ? "text-[#37C643] bg-[#37C643]/10"
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
                  className="bg-[#37C643] text-white px-5 py-3 rounded-xl text-sm font-semibold mt-2"
                >
                  Book Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl border flex items-center justify-center transition-all duration-300 ${
              isButtonOverColoredSection
                ? "bg-[#069587] hover:bg-[#057a6e] border-[#057a6e]"
                : "bg-[#37C643] hover:bg-[#2eaa38] border-[#2eaa38]"
            }`}
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