import { ShieldCheck } from "lucide-react";

const badges = ["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "HIPAA Ready"];

const CertificationsSection = () => (
  <section className="py-20 md:py-28 bg-surface-accent">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Enterprise-Grade Security & Compliance
      </h2>
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        <p className="text-muted-foreground leading-relaxed">
          Compliance Vista is built entirely on Salesforce's secure infrastructure.
          Your data never leaves the Salesforce platform. We maintain industry-leading
          compliance certifications to protect your organization and meet the most
          stringent regulatory requirements.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sm text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CertificationsSection;
