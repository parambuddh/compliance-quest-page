import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">Privacy Policy</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Important Notice */}
            <div className="glass-strong rounded-2xl p-6 border border-primary/20 bg-primary/5">
              <h3 className="text-lg font-bold text-foreground mb-2">⚠️ Important Legal Notice</h3>
              <p className="text-muted-foreground">
                ComplianceVista's Privacy Policy is currently being prepared by our legal team and privacy specialists. For a complete and legally binding privacy policy that complies with all applicable regulations (GDPR, CCPA, etc.), please contact our legal department at{" "}
                <a href="mailto:privacy@compliancevista.com" className="text-primary hover:underline">
                  privacy@compliancevista.com
                </a>
              </p>
            </div>

            {/* Content Sections */}
            <div className="prose prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ComplianceVista ("Company", "we", "our", or "us") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Information Collection and Use</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
                <h3 className="text-xl font-semibold text-foreground mb-2">Types of Data Collected:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                    <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                      <li>Email address</li>
                      <li>First name and last name</li>
                      <li>Phone number</li>
                      <li>Address, State, Province, ZIP/Postal code, City</li>
                      <li>Cookies and Usage Data</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Use of Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ComplianceVista uses the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Security of Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="glass-strong rounded-xl p-4 space-y-2">
                  <p className="text-foreground">
                    <strong>Privacy Team</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a href="mailto:privacy@compliancevista.com" className="text-primary hover:underline">
                      privacy@compliancevista.com
                    </a>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal data, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to restrict processing of your data</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default PrivacyPolicy;
