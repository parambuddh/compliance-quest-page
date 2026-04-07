import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const PrivacyPolicy = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

            {/* Content Sections */}
            <div className="prose prose-invert max-w-none space-y-6 text-base text-justify">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Privacy Notice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The website located at www.compliancevista.com, (the "Website") is published, owned, and operated by Ardira Corporation, its affiliates and related entities ("ComplianceVista," "the Company," "we," "us," and "our"). ComplianceVista respects your privacy and is committed to protecting your privacy through our compliance with this website privacy policy (the "Policy"). This Policy should be read in conjunction with our website{" "}
                  <a href="/terms-of-use" className="text-primary hover:underline">
                    Terms of Use
                  </a>
                  , into which this Policy is incorporated by reference.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">This Policy Describes:</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>The types of information we collect from you or that you may provide when you visit our website available at: compliancevista.com ("our Website")</li>
                  <li>Our practices for collecting, using, maintaining, protecting, and disclosing that information</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please read this Policy carefully to understand our practices regarding your information and how we will treat it. If you do not agree with our policies and practices, then please do not use our Website. By using our Website, you agree to the terms of this Policy. This Policy may change from time to time (see below, "Changes to this Policy"). Your continued use of our Website after we make changes is deemed to be acceptance of those changes, so please check the Policy periodically for updates.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">What We Collect and How We Collect It</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To ensure that we provide you with the best possible experience, we will store, use, and share information about you in accordance with this Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Information You Provide to Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Personal Information is any information that can be used to individually identify you from a larger group, such as data including, but not limited to, your:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Telephone number</li>
                  <li>State/region</li>
                  <li>Company/organization name</li>
                  <li>Job title</li>
                  <li>Job level (e.g., Supervisor, Manager, Consultant, etc.)</li>
                  <li>Job role (e.g., Finance, Human Resources, Information Technology, etc.)</li>
                  <li>Comments or messages provided in free text boxes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  When you provide us Personal Information, we may combine that Personal Information from other data we have collected about you to learn more about you and to provide additional services. For example, your Personal Information may be included to update user profiles, provide services to follow-up on your prior questions or requests, and supplement existing marketing and sales promotional lists.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">You may provide us Personal Information when you:</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Request information</li>
                  <li>Provide requested services</li>
                  <li>Update your user profile</li>
                  <li>Schedule a demonstration</li>
                  <li>Apply for a job</li>
                  <li>Subscribe to our emails</li>
                  <li>Register yourself with our Website</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The information that you provide in each case will vary. In some cases, we may ask you to create a username and password that should only be known to you.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Automated Information Collection</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  In addition to the information that you provide to us, we may also collect information about you during your visit to our Website. We collect this information using automated tools that are detailed below. These tools may collect information about your behavior and your computer system, such as your internet address (IP Address), the pages you have viewed, and the actions you have taken while using our Website. Some of the tools we use to automatically collect information about you may include:
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">(a) Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  A "cookie" is a small data file transmitted from a website to your computer's hard drive. Cookies are not used to run programs or deliver viruses to your computer. Instead, we use cookies to help you personalize your online experience. One of the primary purposes of cookies is to provide a convenience feature to save you time. For example, if you personalize pages on our Website, or register for a subscription service, a cookie helps us to recall your specific information on subsequent visits. When you return to the Website, the information you previously provided can be retrieved, so you can easily use the customized features.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Cookies are usually defined in one of two ways, and we may use both of them:
                </p>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Session cookies, which do not stay on your computer after you close your browser</li>
                  <li>Persistent cookies, which remain on your computer until you delete them or they expire</li>
                </ul>

                <h4 className="text-lg font-semibold text-foreground mt-4 mb-3">We may use the following categories of cookies on our Website:</h4>
                <ul className="list-decimal list-inside space-y-3 text-muted-foreground ml-2">
                  <li>
                    <span className="font-semibold">Strictly Necessary Cookies.</span> These cookies are essential in order to enable you to move around the Website and use its features. Without these cookies, services you have requested, such as maintaining a record of your downloaded items, cannot be provided.
                  </li>
                  <li>
                    <span className="font-semibold">Performance Cookies.</span> These cookies collect anonymous information on how people use our Website to help us understand how you arrive at our site, browse or use our Website and highlight areas where we can improve, such as navigation. The data stored by these cookies never shows personal details from which your individual identity can be established.
                  </li>
                  <li>
                    <span className="font-semibold">Functionality Cookies.</span> These cookies remember choices you make such as the country from which you visit our Website, your preferred language, and your search parameters. This information can then be used to provide you with an experience more appropriate to your selections and to make your visits to our Website more tailored to your preferences. The information in these cookies may be anonymized. These cookies cannot track your browsing activity on other websites.
                  </li>
                  <li>
                    <span className="font-semibold">Targeting Cookies or Advertising Cookies.</span> These cookies collect information about your browsing habits in order to make advertising more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of an advertising campaign. The cookies are usually placed by third-party advertising networks. These cookies remember the websites you visit and that information is shared with other parties.
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Of course, if you do not wish to have cookies on your devices, you may turn them off at any time by modifying your internet browser's settings. However, by disabling cookies on your device, you may be prohibited from full use of the Website's features or lose access to some functionality.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">(b) Embedded Web Links</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Links provided in our emails and, in some cases, on third-party websites may include tracking technology embedded in the link. The tracking system allows us to understand how the link is being used by email recipients. Some of these links will enable us to identify that you have personally clicked on the link and this may be attached to the Personal Information that we hold about you. This data is used to improve our service to you and to help us understand the performance of our marketing campaigns.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">(c) Third-Party Websites and Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We work with a number of service providers of marketing communications technology. These service providers may use various data collection methods to improve the performance of the marketing campaigns we are contracting them to provide. The information collected can be gathered on our Website and also on the websites where our marketing communications are appearing. For example, we may collect data where our banner advertisements are displayed on third-party websites.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Do Not Track Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use cookies or other technologies to enable us to serve ComplianceVista advertisements to you on trusted third party websites. However, no Personal Information is shared in such advertisement placements. Our Website recognizes and responds to Do Not Track ("DNT") signals from your internet web browser. If you choose to enable such DNT features, you will not receive such advertisements on third party websites.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Your Choices and Selecting Your Privacy Preferences</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We want to provide you with relevant information that you have requested. When you initially make contact with us, such as through requesting a white paper or requesting a demonstration of a product, we will add your information to our communications list. If we provide subscription-based services, such as email newsletters, we will always allow you to make choices about what information you provide at the point of information collection or at any time after you have received a communication from us while you are subscribed to the service.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may opt-out of receiving communications from us at any time by selecting the "unsubscribe" link at the bottom of each email. Please note that by opting out or unsubscribing you might affect other services you have requested we provide to you, in which email communication is a requirement of the service provided. Any such communications you receive from us will be administered in accordance with your preferences and this Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Accuracy and Access to Your Personal Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We strive to maintain and process your information accurately. We have processes in place to maintain all of our information in accordance with relevant data governance frameworks and legal requirements. We employ technologies designed to help us maintain information accuracy on input and processing.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Should you have any questions about your Personal Information, please e-mail us at{" "}
                  <a href="mailto:legal@ardira.com" className="text-primary hover:underline">
                    legal@ardira.com
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Information of Minors</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not actively seek to gather information from individuals under the age of eighteen (18). We do not target our Website to minors, and would not expect them to be engaging with our websites or services. We encourage parents and guardians to provide adequate protection measures to prevent minors from providing information unwillingly on the internet. If we are aware of any Personal Information that we have collected about minors, we will take steps to securely remove it from our systems.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The information we gather and that you provide is collected to provide you information and the services you request, in addition to various other purposes, including, but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Assisting you with items such as personalized experiences, facilitation of product usage, and enforcement of Terms of Use</li>
                  <li>Preventing malicious activity and providing you with a secure experience</li>
                  <li>Providing service and support for services you request</li>
                  <li>Providing marketing communications that are effective and optimized for you</li>
                  <li>Keeping you up-to-date with the latest benefits available from us</li>
                  <li>Preventing unwanted messages or content</li>
                  <li>Measuring the performance of our marketing programs</li>
                  <li>Contacting you about services and offers that are relevant to you</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">How We Share Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not sell or lease your information to any third party. We may disclose your Personal Information to our trusted third-party business partners in accordance with this Policy. We work with a number of partners that help us process your requests, deliver customer service and support, send email marketing communications, and provide experiences that you have come to expect from us. We also work with a select group of trusted third-party business partners for sales and marketing purposes and to offer added value to our customers. We will share your information with these third parties in order to fulfill the service that they provide to us. These third-party partners are under contract to keep your information secure and not to use it for any reason other than to fulfill the service we have requested from them.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  One such trusted third-party partner is Google Analytics. The Website sends aggregated, non-Personal Information to Google Analytics for the purpose of providing us with the ability to conduct technical and statistical analysis on the Website's performance. For more information on how Google Analytics supports the Website and uses information sent from the Website, please review Google's privacy policy available at{" "}
                  <a href="https://policies.google.com/technologies/partner-sites" className="text-primary hover:underline">
                    https://policies.google.com/technologies/partner-sites
                  </a>
                  .
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <span className="font-semibold">California Residents.</span> As already disclosed, we may market our services to you on third party websites by showing you advertisements for ComplianceVista products or services. We will not share your Personal Information with such third parties for the purposes of any third party marketing of its products to you without your prior consent.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Except as described in this Policy, we will not share your information with third parties without your notice and consent, unless it is under one of the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Responding to duly authorized information requests from law enforcement or other governmental authorities</li>
                  <li>Complying with any law, regulation, subpoena, or court order</li>
                  <li>Investigating and helping prevent security threats, fraud, or other malicious activity</li>
                  <li>Enforcing or protecting the rights and properties of ComplianceVista or its subsidiaries</li>
                  <li>Protecting the rights or personal safety of ComplianceVista's employees</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  There are circumstances where ComplianceVista may decide to buy, sell, or reorganize its business in selected countries. Under these circumstances, it may be necessary to share or receive Personal Information with prospective or actual partners or affiliates. In such circumstances, ComplianceVista will ensure your information is used in accordance with this Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Third-Party Websites</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Policy does not apply to websites or other domains that are maintained or operated by third parties or our affiliates. Our Website may link to third-party websites and services, but these links are not endorsements of these sites, and this Policy does not extend to them. Because this Policy is not enforced on these third-party websites, we encourage you to read any posted privacy policy of the third-party website before using the service or site and providing any information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">International</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not currently market or sell our goods and services to customers outside the United States or Canada. Accordingly, we do not warrant or represent our use of your Personal Information as described in this Policy will necessarily comply with laws of countries other than the United States or Canada. However, we understand many visitors to our Website may be located outside the United States or Canada. To provide you with our Website services or to operate our Website, please be advised we may store, process, and transmit information in the United States, Canada, and other countries that may not have the same privacy and security laws as the country in which you live. Regardless of the country in which such information is stored or from which you access our Website, we will process your Personal Information in accordance with this Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Safeguarding the Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We take reasonable technical, administrative, and physical safeguards in order to protect your Personal Information against accidental loss and from unauthorized access, use, alteration, and disclosure. However, we can never promise 100% security. You have a responsibility, as well, to safeguard your information through the proper use and security of any online credentials used to access your Personal Information, such as a username and password. If you believe your credentials have been compromised, please change your password. Please also notify us of any unauthorized use.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Changes to this Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If we make any changes to this Policy, a revised Policy will be posted on this webpage and the date of the change will be reported in the "Last Revised" block. You can get to this page from our Website by clicking on the "Privacy Policy" link (usually at the bottom of the screen).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">How to Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We value your opinions and welcome your feedback. To contact us about this Policy or your Personal Information, please contact us at:
                </p>
                <div className="glass-strong rounded-xl p-4 space-y-3">
                  <p className="text-foreground font-semibold">Legal Department</p>
                  <p className="text-muted-foreground">Ardira Corporation</p>
                  <p className="text-muted-foreground">
                    Legal Email:{" "}
                    <a href="mailto:legal@ardira.com" className="text-primary hover:underline">
                      legal@ardira.com
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    Support Email:{" "}
                    <a href="mailto:support@ardira.com" className="text-primary hover:underline">
                      support@ardira.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Scroll to Top Button - Fixed Position */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <FooterSection />
    </>
  );
};

export default PrivacyPolicy;
