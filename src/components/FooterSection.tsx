import logo from "/ComplianceVista-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const navigateToSection = (sectionId: string) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const goToHome = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-navy text-navy-foreground pt-6 sm:pt-8 pb-4 m-0">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container relative">

        {/* Mobile: Logo and tagline - LEFT aligned */}
        <div className="md:hidden flex flex-col items-start text-left mb-8 sm:mb-10">
          <button
            onClick={goToHome}
            aria-label="ComplianceVista - Return to Home"
            className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity bg-none border-none cursor-pointer p-0"
          >
            <img src={logo} alt="ComplianceVista" width={180} height={40} loading="lazy" decoding="async" className="h-8 sm:h-10 w-auto" />
          </button>
          <p className="text-xs sm:text-sm text-navy-foreground/80 leading-relaxed">
            Enterprise governance simplified. Salesforce-native compliance by Ardira.
          </p>
        </div>

        {/* Desktop: Logo left (~40%), Quick Links center, Contact Info right */}
        <div className="hidden md:flex mb-8 sm:mb-10 items-start">

          {/* Col 1: Logo — takes up left 40% */}
          <div className="flex flex-col items-start w-[40%]">
            <button
              onClick={goToHome}
              aria-label="ComplianceVista - Return to Home"
              className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity bg-none border-none cursor-pointer p-0"
            >
              <img src={logo} alt="ComplianceVista" width={180} height={40} loading="lazy" decoding="async" className="h-8 sm:h-10 w-auto" />
            </button>
            <p className="text-sm text-navy-foreground/80 text-left leading-relaxed max-w-[260px]">
              Enterprise governance simplified. Salesforce-native compliance by Ardira.
            </p>
          </div>

          {/* Col 2: Quick Links — center */}
          <div className="flex flex-col items-start w-[30%]">
            <h3 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><button onClick={() => navigateToSection('overview')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Overview</button></li>
              <li><button onClick={() => navigateToSection('features')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Features</button></li>
              <li><button onClick={() => navigateToSection('benefits')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Benefits</button></li>
              <li><button onClick={() => navigateToSection('use-cases')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Use Cases</button></li>
              <li><button onClick={() => navigateToSection('contact')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Contact Us</button></li>
            </ul>
          </div>

          {/* Col 3: Contact Info — right 30% */}
          <div className="flex flex-col items-start w-[30%]">
            <h3 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Contact Info</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <svg className="shrink-0 w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                <a href="https://compliance-quest-page.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">www.compliancevista.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="shrink-0 w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <a href="mailto:info@ardira.com" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">info@ardira.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="shrink-0 w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href="tel:+16697776838" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">1.669.777.6838</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile: Two column layout - WITH icons */}
        <div className="md:hidden grid grid-cols-2 gap-6 mb-8 sm:mb-10">
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-white mb-3 text-xs">Quick Links</h3>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => navigateToSection('overview')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Overview</button></li>
              <li><button onClick={() => navigateToSection('features')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Features</button></li>
              <li><button onClick={() => navigateToSection('benefits')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Benefits</button></li>
              <li><button onClick={() => navigateToSection('use-cases')} className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0 text-left">Use Cases</button></li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-bold text-white mb-3 text-xs">Contact Info</h3>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-1.5">
                <svg className="shrink-0 w-3.5 h-3.5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                <a href="https://compliance-quest-page.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 break-all">www.compliancevista.com</a>
              </li>
              <li className="flex items-start gap-1.5">
                <svg className="shrink-0 w-3.5 h-3.5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <a href="mailto:info@ardira.com" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 break-all">info@ardira.com</a>
              </li>
              <li className="flex items-start gap-1.5">
                <svg className="shrink-0 w-3.5 h-3.5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href="tel:+16697776838" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">1.669.777.6838</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright and Legal Links */}
        <div className="border-t border-navy-foreground/10 py-4">
          <div className="md:hidden flex flex-col items-center gap-2 sm:gap-3">
            <div className="flex gap-2 sm:gap-4 text-xs justify-center">
              <Link to="/terms-of-use" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">Terms of Use</Link>
              <span className="text-navy-foreground/40">|</span>
              <Link to="/privacy-policy" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">Privacy Policy</Link>
            </div>
            <p className="text-xs text-navy-foreground/60">© {currentYear} Ardira Corporation. All Rights Reserved.</p>
          </div>

          <div className="hidden md:flex items-center justify-between">
            <p className="text-xs text-navy-foreground/60">© {currentYear} Ardira Corporation. All Rights Reserved.</p>
            <div className="flex gap-2 sm:gap-4 text-xs md:text-sm">
              <Link to="/terms-of-use" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">Terms of Use</Link>
              <span className="text-navy-foreground/40">|</span>
              <Link to="/privacy-policy" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">Privacy Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;