import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy"
        description="Learn how Akinola Olujobi collects, uses, and protects your personal information."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Privacy Policy"
          subtitle="Your privacy matters to us"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground"><strong>Last Updated:</strong> January 6, 2026</p>
              
              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Akinola Olujobi's website. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground">We may collect the following types of information:</p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number when you contact us or subscribe to our newsletter.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and navigation patterns.</li>
                <li><strong>Device Information:</strong> Browser type, IP address, device type, and operating system.</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your experience. See our Cookie Policy below.</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground">We use your information to:</p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send newsletters and promotional materials (with your consent)</li>
                <li>Improve our website and user experience</li>
                <li>Display personalized advertisements</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">4. Cookies & Advertising</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies. Third-party vendors, including Google, use cookies to serve ads 
                based on your prior visits to our website. You can opt out of personalized advertising by visiting 
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mx-1">Google Ads Settings</a>.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may use third-party services including Google Analytics, Google AdSense, and social media platforms. 
                These services have their own privacy policies governing the use of your information.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information. However, no method of 
                transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Object to processing of your data</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:connect@akinolaolujobi.com" className="text-primary hover:underline">
                  connect@akinolaolujobi.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
