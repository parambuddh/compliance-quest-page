import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const TermsOfUse = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-surface-light to-background">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">Terms of Use</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Important Notice */}
            <div className="glass-strong rounded-2xl p-6 border border-primary/20 bg-primary/5">
              <h3 className="text-lg font-bold text-foreground mb-2">⚠️ Important Legal Notice</h3>
              <p className="text-muted-foreground">
                ComplianceVista's Terms of Use are currently being prepared by our legal team. For a complete and legally binding set of terms, please contact our legal department at{" "}
                <a href="mailto:legal@compliancevista.com" className="text-primary hover:underline">
                  legal@compliancevista.com
                </a>
              </p>
            </div>

            {/* Content Sections */}
            <div className="prose prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the ComplianceVista platform and website, you accept and agree to be bound by the terms and provision of this agreement. If You do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials (information or software) on ComplianceVista for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on ComplianceVista's website are provided on an 'as is' basis. ComplianceVista makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Limitations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall ComplianceVista or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ComplianceVista's website, even if ComplianceVista or a ComplianceVista authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Accuracy of Materials</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials appearing on ComplianceVista's website could include technical, typographical, or photographic errors. ComplianceVista does not warrant that any of the materials on its website are accurate, complete, or current. ComplianceVista may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ComplianceVista has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ComplianceVista of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ComplianceVista may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of use.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the United States of America, and you irrevocably submit to the exclusive jurisdiction of the courts located in this location.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us at:
                </p>
                <div className="glass-strong rounded-xl p-4 space-y-2">
                  <p className="text-foreground">
                    <strong>Legal Department</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a href="mailto:legal@compliancevista.com" className="text-primary hover:underline">
                      legal@compliancevista.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default TermsOfUse;
