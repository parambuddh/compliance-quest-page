import logo from "@/assets/compliance-vista-logo.png";

const FooterSection = () => (
  <footer className="relative overflow-hidden bg-navy text-navy-foreground py-16">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container relative">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <img src={logo} alt="Compliance Vista" className="h-10 brightness-0 invert" />
          </div>
          <p className="text-sm text-navy-foreground/50 leading-relaxed">
            Enterprise governance simplified. A Salesforce-native compliance management solution by Ardira Technologies.
          </p>
        </div>

        {[
          { title: "Product", links: ["Features", "Pricing", "Security", "Compliance"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Security", "Cookie Settings"] },
        ].map((col, i) => (
          <div key={i}>
            <h4 className="font-bold text-primary-foreground mb-4 text-sm">{col.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-navy-foreground/50 hover:text-primary transition-colors duration-300">
                    {l}
                  </a>
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
