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
    question: "What makes ComplianceVista different from other compliance solutions?",
    answer:
      "ComplianceVista is 100% native to Salesforce. It provides real-time compliance monitoring, automated audit trails, and intelligent risk scoring all within the platform your team already uses. Plus, it's designed specifically for enterprise-scale governance with multi-language support and industry-specific compliance frameworks.",
  },
  {
    id: "item-3",
    question: "Can ComplianceVista handle multiple regulatory frameworks simultaneously?",
    answer:
      "Absolutely. ComplianceVista supports multiple regulatory frameworks (SOC2, ISO 27001, GDPR, HIPAA, and more) in a single instance. You can map different compliance requirements to different Salesforce objects and have automated workflows that enforce compliance across all regulations simultaneously. Custom frameworks can also be configured based on your specific needs.",
  },
  {
    id: "item-4",
    question: "What kind of reporting and dashboards does ComplianceVista provide?",
    answer:
      "ComplianceVista includes pre-built compliance dashboards for executive reporting, regulatory audits, and operational monitoring. You get real-time KPI tracking, automated compliance metrics, audit-ready reports, and customizable dashboards. All reports can be exported in multiple formats and integrated with your existing Salesforce reporting infrastructure.",
  },
  {
    id: "item-5",
    question: "Is my data secure within ComplianceVista?",
    answer:
      "Yes. ComplianceVista is built entirely on Salesforce's secure infrastructure with SOC 2 Type II, ISO 27001, and GDPR compliance certifications. Data never leaves the Salesforce platform, ensuring enterprise-grade security. We implement role-based access controls, encryption at rest and in transit, and comprehensive audit trails for all data access.",
  },
];

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-violet-50/40 via-white to-purple-50/30">
      {/* Subtle decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 px-4 mt-4">
            Frequently Asked <span className="text-[#37C643]">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4 mt-3">
            Find answers to common questions about ComplianceVista and how it can help your organization manage compliance at scale.
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
            className="w-full space-y-3"
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
                  className="border border-slate-200 rounded-lg sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#37C643]/40 hover:shadow-md bg-white"
                >
                  <AccordionTrigger
                    className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 hover:bg-slate-50/50 transition-colors duration-200 [&[data-state=open]]:bg-[#37C643]/5 group"
                    aria-label={`Question ${index + 1}: ${faq.question}`}
                  >
                    <div className="flex items-center gap-4 text-left flex-1" aria-hidden="true">
                      <span className="font-semibold text-sm sm:text-base md:text-lg text-slate-900 group-hover:text-[#37C643] transition-colors duration-200">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
