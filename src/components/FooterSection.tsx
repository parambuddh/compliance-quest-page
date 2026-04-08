import logo from "/ComplianceVista-logo.svg";
import { Link } from "react-router-dom";

const FooterSection = () => (
  <footer className="relative overflow-hidden bg-navy text-navy-foreground py-8">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container relative">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-12 mb-8 max-w-full">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <img src={logo} alt="Compliance Vista" className="h-10" />
          </div>
          <p className="text-sm text-navy-foreground/60 leading-relaxed text-justify">
            Enterprise governance simplified. A Salesforce-native compliance management solution by Ardira Technologies.
          </p>
        </div>

        {/* Right Column - Quick Links and Contact Info */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-base">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#overview" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  Overview
                </a>
              </li>
              <li>
                <a href="#features" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#use-cases" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#contact" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-6 text-base">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">🌐</span>
                <a href="https://www.compliancevista.com" target="_blank" rel="noopener noreferrer" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  www.compliancevista.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <a href="mailto:support@ardira.com" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  support@ardira.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📱</span>
                <a href="tel:1.669.777.6838" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
                  1.669.777.6838
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-navy-foreground/40">
          © 2026 ComplianceVista. All Rights Reserved.
        </p>
        <div className="flex gap-6 text-xs">
          <Link to="/terms-of-use" className="text-navy-foreground/40 hover:text-primary transition-colors duration-300">
            Terms of Use
          </Link>
          <Link to="/privacy-policy" className="text-navy-foreground/40 hover:text-primary transition-colors duration-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
