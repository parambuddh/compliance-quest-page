import { motion } from "framer-motion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "What makes Compliance Vista different from other compliance solutions?",
    answer:
      "Compliance Vista is 100% native to Salesforce, meaning it integrates seamlessly without requiring external systems or data transfers. It provides real-time compliance monitoring, automated audit trails, and intelligent risk scoring all within the platform your team already uses. Plus, it's designed specifically for enterprise-scale governance with multi-language support and industry-specific compliance frameworks.",
  },
  {
    id: "item-2",
    question: "How long does it take to implement Compliance Vista?",
    answer:
      "Implementation typically takes 2-4 weeks depending on your organization's complexity and existing Salesforce infrastructure. We provide dedicated implementation support, training, and custom configuration to ensure a smooth deployment. Most organizations see compliance improvements within the first month of implementation.",
  },
  {
    id: "item-3",
    question: "Can Compliance Vista handle multiple regulatory frameworks simultaneously?",
    answer:
      "Absolutely. Compliance Vista supports multiple regulatory frameworks (SOC2, ISO 27001, GDPR, HIPAA, and more) in a single instance. You can map different compliance requirements to different Salesforce objects and have automated workflows that enforce compliance across all regulations simultaneously. Custom frameworks can also be configured based on your specific needs.",
  },
  {
    id: "item-4",
    question: "What kind of reporting and dashboards does Compliance Vista provide?",
    answer:
      "Compliance Vista includes pre-built compliance dashboards for executive reporting, regulatory audits, and operational monitoring. You get real-time KPI tracking, automated compliance metrics, audit-ready reports, and customizable dashboards. All reports can be exported in multiple formats and integrated with your existing Salesforce reporting infrastructure.",
  },
  {
    id: "item-5",
    question: "Is my data secure within Compliance Vista?",
    answer:
      "Yes. Compliance Vista is built entirely on Salesforce's secure infrastructure with SOC 2 Type II, ISO 27001, and GDPR compliance certifications. Data never leaves the Salesforce platform, ensuring enterprise-grade security. We implement role-based access controls, encryption at rest and in transit, and comprehensive audit trails for all data access.",
  },
];

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section id="faq" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface-light" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full px-4 py-2 mb-5">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Compliance Vista and how it can help your organization manage compliance at scale.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-4"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setOpenItem(faq.id)}
              >
                <AccordionItem
                  value={faq.id}
                  className="border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg bg-card"
                >
                  <AccordionTrigger className="px-8 py-6 hover:bg-surface-light/50 transition-colors duration-200 [&[data-state=open]]:bg-primary/8 group">
                    <div className="flex items-center gap-4 text-left flex-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-200">
                        <span className="text-primary font-bold text-lg">{index + 1}</span>
                      </div>
                      <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 pt-2 text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Didn't find what you're looking for?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
