const FinalCTASection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-secondary">
      <div className="container text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Simplify Enterprise Compliance?
        </h2>
        <p className="text-primary-foreground/80 mb-8">
          Join 500+ enterprise customers managing compliance with confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="bg-background text-primary px-8 py-3.5 rounded-lg font-semibold hover:bg-background/90 transition-colors shadow-lg"
          >
            Request a Demo
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
