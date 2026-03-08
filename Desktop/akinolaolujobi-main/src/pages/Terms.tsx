import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Terms of Service"
        description="Read the terms and conditions for using Akinola Olujobi's website and services."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Terms of Service"
          subtitle="Please read these terms carefully"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground"><strong>Last Updated:</strong> January 6, 2026</p>
              
              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the website akinolaolujobi.com, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access the website.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">2. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, images, audio clips, digital downloads, 
                and software, is the property of Akinola Olujobi and is protected by international copyright laws.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">3. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily view the materials on this website for personal, non-commercial use only. 
                This license does not include:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for commercial purposes</li>
                <li>Attempting to decompile or reverse engineer any software</li>
                <li>Removing any copyright or proprietary notations</li>
                <li>Transferring the materials to another person</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">4. Services</h2>
              <p className="text-muted-foreground">
                Akinola Olujobi offers various services including speaking engagements, digital marketing consultation, 
                writing, and educational content. Specific terms for each service will be provided upon engagement.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">5. E-Books & Digital Products</h2>
              <p className="text-muted-foreground">
                All digital products purchased are for personal use only. Redistribution, resale, or sharing of 
                purchased content is strictly prohibited. Refunds may be available within 7 days of purchase if 
                the content has not been downloaded.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">6. User Comments & Content</h2>
              <p className="text-muted-foreground">
                Users may post comments on blog articles. By posting content, you grant us the right to use, 
                modify, and display that content. You agree not to post content that is:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Unlawful, harmful, or harassing</li>
                <li>Defamatory or invasive of privacy</li>
                <li>Infringing on intellectual property rights</li>
                <li>Spam or promotional without permission</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">7. Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on this website are provided "as is." Akinola Olujobi makes no warranties, 
                expressed or implied, and hereby disclaims all warranties including merchantability and 
                fitness for a particular purpose.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">8. Limitations</h2>
              <p className="text-muted-foreground">
                Akinola Olujobi shall not be liable for any damages arising from the use or inability to use 
                the materials on this website, even if notified of the possibility of such damages.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of Nigeria, 
                without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately 
                upon posting to the website.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">11. Contact</h2>
              <p className="text-muted-foreground">
                Questions about these Terms of Service should be sent to:{' '}
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

export default Terms;
