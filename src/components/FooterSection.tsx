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
  <footer className="relative overflow-hidden bg-navy text-navy-foreground pt-6 sm:pt-8 pb-0">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container relative pb-0">
      <div className="container pt-4 sm:pt-6 pb-0">
        {/* Company Info - Full width */}
        <div className="flex flex-col items-start mb-8 sm:mb-10 md:hidden">
          <button 
            onClick={() => navigateToSection('home')} 
            aria-label="Compliance Vista - Return to Home"
            className="flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity bg-none border-none cursor-pointer p-0"
          >
            <img src={logo} alt="Compliance Vista" width={180} height={40} className="h-8 sm:h-10 w-auto" />
          </button>
          <p className="text-sm text-navy-foreground/60 leading-relaxed max-w-xs text-left">
            Enterprise governance simplified. Salesforce-native compliance by Ardira.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 mb-8 sm:mb-10">
          {/* Company Info - Left (Col 1) - Desktop only */}
          <div className="hidden md:flex flex-col items-start md:col-span-1">
            <button 
              onClick={() => navigateToSection('home')} 
              aria-label="Compliance Vista - Return to Home"
              className="flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity bg-none border-none cursor-pointer p-0"
            >
              <img src={logo} alt="Compliance Vista" width={180} height={40} className="h-8 sm:h-10 w-auto" />
            </button>
            <p className="text-sm text-navy-foreground/60 leading-relaxed max-w-xs text-left">
              Enterprise governance simplified. Salesforce-native compliance by Ardira.
            </p>
          </div>

          {/* Spacer (Col 2) */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Quick Links - Center (Col 3) */}
          <div className="flex flex-col md:items-center md:col-span-1 col-span-1">
            <div className="w-fit">
              <h3 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h3>
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
          </div>

          {/* Spacer (Col 4) */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Contact Info - Right (Col 5) */}
          <div className="flex flex-col md:items-end md:col-span-1 col-span-1 min-w-0">
            <div className="w-full md:w-fit">
              <h3 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Contact Info</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 pt-[2px]" aria-hidden="true">🌐</span>
                  <a href="https://compliance-quest-page.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Visit Compliance Vista main website" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 break-all">
                    www.compliancevista.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 pt-[2px]" aria-hidden="true">✉️</span>
                  <a href="mailto:support@ardira.com" aria-label="Email support at support@ardira.com" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                    support@ardira.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 pt-[2px]" aria-hidden="true">📱</span>
                  <a href="tel:1.669.777.6838" aria-label="Call support at 1.669.777.6838" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                    1.669.777.6838
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-foreground/10 py-3 flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-navy-foreground/60 order-2 md:order-1">
            © {currentYear} ComplianceVista. All Rights Reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs order-1 md:order-2">
            <Link to="/terms-of-use" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
              Terms of Use
            </Link>
            <Link to="/privacy-policy" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
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
