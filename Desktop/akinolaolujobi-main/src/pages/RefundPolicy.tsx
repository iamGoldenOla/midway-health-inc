import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Refund Policy"
        description="Understand the refund and return policy for e-books and digital products from Akinola Olujobi."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Refund Policy"
          subtitle="Our commitment to your satisfaction"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground"><strong>Last Updated:</strong> February 25, 2026</p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">1. Overview</h2>
              <p className="text-muted-foreground">
                We value your satisfaction and strive to provide high-quality digital products and services. 
                This Refund Policy outlines the terms under which you may request a refund for purchases made 
                through akinolaolujobi.com.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">2. E-Books & Digital Downloads</h2>
              <p className="text-muted-foreground">
                Due to the nature of digital products, all sales of e-books and downloadable content are 
                generally <strong>final</strong>. However, we offer a refund under the following conditions:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>You request a refund within <strong>7 days</strong> of purchase</li>
                <li>The content has <strong>not been downloaded</strong> or accessed</li>
                <li>You received a defective or corrupted file that cannot be resolved</li>
                <li>The product was significantly different from its description</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">3. Online Courses & Tutorials</h2>
              <p className="text-muted-foreground">
                For online courses and tutorials:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Refund requests must be made within <strong>14 days</strong> of purchase</li>
                <li>Less than <strong>20%</strong> of the course content must have been accessed</li>
                <li>Refunds will be prorated based on content consumed</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">4. Speaking & Consulting Services</h2>
              <p className="text-muted-foreground">
                For booked speaking engagements and consulting sessions:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Cancellations made <strong>48+ hours</strong> before the session receive a full refund</li>
                <li>Cancellations made <strong>24–48 hours</strong> before the session receive a 50% refund</li>
                <li>Cancellations made <strong>less than 24 hours</strong> before are non-refundable</li>
                <li>No-shows are non-refundable</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">5. How to Request a Refund</h2>
              <p className="text-muted-foreground">
                To request a refund, please contact us with the following information:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Your full name and email used for the purchase</li>
                <li>Order/transaction reference number</li>
                <li>Product or service purchased</li>
                <li>Reason for the refund request</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Send your request to:{' '}
                <a href="mailto:connect@akinolaolujobi.com" className="text-primary hover:underline">
                  connect@akinolaolujobi.com
                </a>
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">6. Refund Processing</h2>
              <p className="text-muted-foreground">
                Approved refunds will be processed within <strong>7–14 business days</strong>. Refunds will be 
                issued to the original payment method. Please note that your bank or payment provider may take 
                additional time to reflect the refund in your account.
              </p>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">7. Non-Refundable Items</h2>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Completed consulting sessions</li>
                <li>Fully accessed digital products</li>
                <li>Customized or personalized services</li>
                <li>Gift purchases (refund goes to the purchaser)</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold mt-8 mb-4">8. Contact</h2>
              <p className="text-muted-foreground">
                For refund inquiries, reach out to:{' '}
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

export default RefundPolicy;
