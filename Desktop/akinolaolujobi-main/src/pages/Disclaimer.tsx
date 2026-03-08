import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Disclaimer"
        description="Legal disclaimer for Akinola Olujobi's website regarding content, advice, and external links."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Disclaimer"
          subtitle="Important legal information"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground"><strong>Last Updated:</strong> February 25, 2026</p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">1. General Information</h2>
              <p className="text-muted-foreground">
                The information provided on this website (akinolaolujobi.com) is for general informational 
                purposes only. All information on the site is provided in good faith; however, we make no 
                representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, 
                validity, reliability, availability, or completeness of any information on the site.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">2. Professional Advice Disclaimer</h2>
              <p className="text-muted-foreground">
                The site cannot and does not contain professional advice. The content, including blog posts, 
                articles, e-books, and tutorials, is provided for general informational and educational purposes 
                only and is not a substitute for professional advice. Accordingly, before taking any actions based 
                upon such information, we encourage you to consult with the appropriate professionals.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">3. Earnings & Results Disclaimer</h2>
              <p className="text-muted-foreground">
                Any statements or examples of earnings, revenue, or results made on this website are estimates 
                of what is possible. There is no guarantee that you will achieve the same or similar results. 
                Your results will depend on many factors including but not limited to your background, experience, 
                and work ethic. All business involves risk and requires consistent effort and action.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">4. External Links Disclaimer</h2>
              <p className="text-muted-foreground">
                This website may contain links to external websites that are not provided or maintained by us. 
                We do not guarantee the accuracy, relevance, timeliness, or completeness of any information 
                on these external websites. The inclusion of any links does not imply a recommendation or 
                endorsement of the views expressed within them.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">5. Testimonials Disclaimer</h2>
              <p className="text-muted-foreground">
                Testimonials on this website reflect the real-life experiences and opinions of individuals who 
                have used our services. However, individual results may vary. The testimonials are not necessarily 
                representative of all of those who will use our services and are not intended to guarantee that 
                anyone will achieve the same or similar results.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">6. Opinions Expressed</h2>
              <p className="text-muted-foreground">
                All views and opinions expressed on this site are solely those of Akinola Olujobi unless 
                explicitly stated otherwise. They do not represent those of any organization, employer, or 
                any other group or individual.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Under no circumstances shall Akinola Olujobi be liable for any direct, indirect, special, 
                incidental, or consequential damages, including but not limited to loss of data or profit, 
                arising out of the use, or the inability to use, the materials on this site.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">8. Contact</h2>
              <p className="text-muted-foreground">
                If you require any more information or have questions about this disclaimer, please contact us at:{' '}
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

export default Disclaimer;
