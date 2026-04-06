import logo from "/ComplianceVista-logo.svg";
import { Link } from "react-router-dom";

const FooterSection = () => (
  <footer className="relative overflow-hidden bg-navy text-navy-foreground py-16">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container relative">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <img src={logo} alt="Compliance Vista" className="h-10" />
          </div>
          <p className="text-sm text-navy-foreground/50 leading-relaxed">
            Enterprise governance simplified. A Salesforce-native compliance management solution by Ardira Technologies.
          </p>
        </div>

        {[
          { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#" }, { label: "Security", href: "#" }, { label: "Compliance", href: "#" }] },
          { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#contact" }] },
          { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms of Service", href: "/terms-of-use" }, { label: "Security", href: "#" }, { label: "Cookie Settings", href: "#" }] },
        ].map((col, i) => (
          <div key={i}>
            <h4 className="font-bold text-primary-foreground mb-4 text-sm">{col.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link to={l.href} className="text-navy-foreground/50 hover:text-primary transition-colors duration-300">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-navy-foreground/50 hover:text-primary transition-colors duration-300">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-navy-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-navy-foreground/40">
          © 2026 Ardira Technologies. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
