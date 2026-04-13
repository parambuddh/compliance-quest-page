import logo from "/ComplianceVista-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const navigateToSection = (sectionId: string) => {
    if (window.location.pathname === '/') {
      // If already on home page, scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
  <footer className="relative overflow-hidden bg-navy text-navy-foreground py-6 sm:py-8">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container relative">
      <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 max-w-full">
        {/* Company Info - Left (1 col) */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-6">
            <img src={logo} alt="Compliance Vista" width={180} height={40} className="h-8 sm:h-10 w-auto" />
          </div>
          <p className="text-sm text-navy-foreground/60 leading-relaxed max-w-xs">
            Enterprise governance simplified. Salesforce-native compliance by Ardira.
          </p>
        </div>

        {/* Center - Empty (1 col) */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* Right Column - Contact Info and Quick Links (2 cols) */}
        <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-6 sm:gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <button onClick={() => navigateToSection('home')} aria-label="Navigate to Home section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateToSection('overview')} aria-label="Navigate to Overview section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateToSection('features')} aria-label="Navigate to Features section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => navigateToSection('benefits')} aria-label="Navigate to Benefits section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                  Benefits
                </button>
              </li>
              <li>
                <button onClick={() => navigateToSection('use-cases')} aria-label="Navigate to Use Cases section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                  Use Cases
                </button>
              </li>
              <li>
                <button onClick={() => navigateToSection('contact')} aria-label="Navigate to Contact Us section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Contact Info</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary" aria-hidden="true">🌐</span>
                <a href="https://www.compliancevista.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Compliance Vista main website" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                  www.compliancevista.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary" aria-hidden="true">✉️</span>
                <a href="mailto:support@ardira.com" aria-label="Email support at support@ardira.com" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                  support@ardira.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary" aria-hidden="true">📱</span>
                <a href="tel:1.669.777.6838" aria-label="Call support at 1.669.777.6838" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                  1.669.777.6838
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10 pt-3 flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-navy-foreground/40 order-2 md:order-1">
          © {currentYear} ComplianceVista. All Rights Reserved.
        </p>
        <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs order-1 md:order-2">
          <Link to="/terms-of-use" className="text-navy-foreground/40 hover:text-primary transition-colors duration-300">
            Terms of Use
          </Link>
          <Link to="/privacy-policy" className="text-navy-foreground/40 hover:text-primary transition-colors duration-300">
            Privacy Policy
          </Link>
        </div>
      </div>
      </div>
    </div>
  </footer>
  );
};

export default FooterSection;
