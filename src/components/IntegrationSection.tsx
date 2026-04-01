import { Cloud } from "lucide-react";

const clouds = ["Service Cloud", "Sales Cloud", "Commerce Cloud", "Einstein AI"];

const IntegrationSection = () => (
  <section className="py-20 md:py-28 bg-surface-light">
    <div className="container text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
        Seamless Salesforce Integration
      </h2>
      <p className="text-sm text-muted-foreground mb-6">100% native Salesforce. Works with all clouds.</p>
      <p className="text-muted-foreground mb-10">
        Compliance Vista integrates directly with Salesforce Service Cloud, Sales Cloud,
        Commerce Cloud, and Einstein. Map compliance requirements to any Salesforce object
        and automate governance workflows without leaving the platform.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {clouds.map((c, i) => (
          <div key={i} className="flex items-center gap-2 bg-background rounded-lg px-5 py-3 shadow-sm border border-border">
            <Cloud className="w-5 h-5 text-secondary" />
            <span className="font-semibold text-sm text-foreground">{c}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationSection;
