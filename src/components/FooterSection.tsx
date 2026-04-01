import { Linkedin, Twitter, Facebook, Youtube } from "lucide-react";

const FooterSection = () => (
  <footer className="bg-navy text-navy-foreground py-14">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <h4 className="font-bold text-primary-foreground mb-4 text-sm">Product</h4>
          <ul className="space-y-2 text-sm">
            {["Features", "Pricing", "Security", "Compliance"].map((l) => (
              <li key={l}><a href="#features" className="text-navy-foreground/70 hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            {["About", "Blog", "Careers", "Contact"].map((l) => (
              <li key={l}><a href="#contact" className="text-navy-foreground/70 hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm">
            {["Privacy Policy", "Terms of Service", "Security", "Cookie Settings"].map((l) => (
              <li key={l}><a href="#" className="text-navy-foreground/70 hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4 text-sm">Social</h4>
          <div className="flex gap-4">
            {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="text-primary hover:text-secondary transition-colors" aria-label="Social link">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/20 pt-6 text-center text-xs text-navy-foreground/50">
        © 2026 Ardira Technologies. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default FooterSection;
