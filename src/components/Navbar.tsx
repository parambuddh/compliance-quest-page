import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur shadow-md" : "bg-background"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <button onClick={() => handleClick("#home")} className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          🛡️ Compliance Vista
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                activeSection === link.href.slice(1)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleClick("#contact")}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors shadow"
          >
            Book Demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in-up">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`text-left py-2 text-sm font-medium ${
                  activeSection === link.href.slice(1) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleClick("#contact")}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold mt-2"
            >
              Book Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
