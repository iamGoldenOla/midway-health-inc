import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Cookie Policy"
        description="Learn about the cookies used on Akinola Olujobi's website, their purposes, and how to manage them."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Cookie Policy"
          subtitle="How we use cookies on this website"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground"><strong>Last Updated:</strong> February 25, 2026</p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files placed on your device when you visit a website. They help the website 
                remember your preferences and improve your browsing experience. Cookies can be "persistent" (stored 
                until they expire or you delete them) or "session" (deleted when you close your browser).
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">2. Cookies We Use</h2>

              <h3 className="text-xl font-heading font-semibold mt-6 mb-3">Essential Cookies</h3>
              <p className="text-muted-foreground">
                These cookies are necessary for the website to function properly. They enable core features like 
                page navigation, security, and accessibility. You cannot opt out of these cookies.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3 font-mono text-xs">cookie-consent-accepted</td>
                      <td className="p-3">Records your cookie consent preference</td>
                      <td className="p-3">Persistent</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 font-mono text-xs">theme</td>
                      <td className="p-3">Stores your dark/light mode preference</td>
                      <td className="p-3">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-heading font-semibold mt-6 mb-3">Analytics Cookies</h3>
              <p className="text-muted-foreground">
                These cookies help us understand how visitors interact with the website by collecting and reporting 
                information anonymously. This data helps us improve the website.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3 font-mono text-xs">_ga</td>
                      <td className="p-3">Google Analytics — distinguishes unique users</td>
                      <td className="p-3">2 years</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 font-mono text-xs">_gid</td>
                      <td className="p-3">Google Analytics — identifies a browsing session</td>
                      <td className="p-3">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-heading font-semibold mt-6 mb-3">Marketing Cookies</h3>
              <p className="text-muted-foreground">
                These cookies track your online activity to help advertisers deliver more relevant advertising or 
                limit how many times you see an ad. These cookies may be set by our advertising partners.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">3. How to Manage Cookies</h2>
              <p className="text-muted-foreground">
                Most browsers allow you to control cookies through their settings. You can set your browser to 
                refuse cookies, delete cookies, or alert you when cookies are being sent. Note that disabling 
                cookies may affect some website functionality.
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground">
                Some cookies are placed by third-party services that appear on our pages. We do not control these 
                cookies. Third-party providers include Google Analytics, Google AdSense, and social media platforms. 
                Please refer to their respective privacy policies for more information.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">5. Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with 
                an updated revision date.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please contact us at:{' '}
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

export default CookiePolicy;
