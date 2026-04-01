import { Shield, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient accent stripe */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent pointer-events-none" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              <span className="text-primary">Compliance Vista:</span>{" "}
              Enterprise Governance Simplified
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Streamline compliance workflows, ensure governance adherence, and
              manage risk directly within Salesforce.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors shadow-lg"
              >
                Request Demo
              </button>
              <button
                onClick={() => scrollTo("overview")}
                className="border-2 border-secondary text-secondary px-8 py-3.5 rounded-lg font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                Learn More
              </button>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
              <span>🛡️ 100% Native Salesforce</span>
              <span className="text-border">|</span>
              <span>Enterprise Security</span>
              <span className="text-border">|</span>
              <span>Real-time Tracking</span>
            </p>
          </div>

          {/* Hero graphic */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="absolute inset-4 rounded-2xl bg-background/80 backdrop-blur shadow-xl flex flex-col items-center justify-center gap-4 p-6">
                <Shield className="w-16 h-16 text-primary" />
                <div className="w-full space-y-2">
                  <div className="h-3 bg-primary/20 rounded-full" />
                  <div className="h-3 bg-secondary/20 rounded-full w-3/4" />
                  <div className="h-3 bg-primary/15 rounded-full w-1/2" />
                </div>
                <div className="grid grid-cols-3 gap-2 w-full mt-2">
                  {[92, 87, 95].map((v, i) => (
                    <div key={i} className="bg-primary/10 rounded-lg p-2 text-center">
                      <span className="text-lg font-bold text-primary">{v}%</span>
                      <p className="text-[10px] text-muted-foreground">KPI</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
