import { ClipboardList, Lock, BarChart3, Clock, Search, Smartphone } from "lucide-react";

const features = [
  { icon: ClipboardList, title: "Policy Management", desc: "Centralized repository with version control and policy lifecycle management." },
  { icon: Lock, title: "Access Control", desc: "Role-based permissions and segregation of duties for enterprise security." },
  { icon: BarChart3, title: "Compliance Reporting", desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks." },
  { icon: Clock, title: "Deadline Tracking", desc: "Automated compliance reminders and deadline management with escalations." },
  { icon: Search, title: "Audit Management", desc: "Evidence collection, audit trail management, and finding resolution." },
  { icon: Smartphone, title: "Mobile Access", desc: "Manage compliance on-the-go with full mobile Salesforce experience." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 md:py-28 bg-surface-light">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Powerful Features Built for Enterprise Compliance
        </h2>
        <p className="text-muted-foreground">Everything you need at enterprise scale</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-background rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-b-[3px] border-transparent hover:border-primary group"
          >
            <f.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
