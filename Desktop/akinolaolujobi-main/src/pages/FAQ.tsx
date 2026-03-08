import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CTASection from '@/components/shared/CTASection';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'Who is Akinola Olujobi?',
        a: 'Akinola Olujobi is a multifaceted professional - a speaker, writer, digital marketer, and creative artist based in Lagos, Nigeria. With years of experience in inspiring audiences and helping brands grow, he combines passion with expertise to deliver impactful results.',
      },
      {
        q: 'What services do you offer?',
        a: 'I offer a range of services including public speaking engagements, digital marketing consultation, content writing, vocal performances, teaching and training, and inspirational coaching. Visit my Services page for detailed information on each offering.',
      },
      {
        q: 'How can I book you for an event?',
        a: 'You can book me for speaking engagements, performances, or consultations through the Contact page. Simply fill out the form with your event details, and I\'ll get back to you within 24-48 hours.',
      },
    ],
  },
  {
    category: 'Services & Booking',
    questions: [
      {
        q: 'What topics do you speak on?',
        a: 'I speak on topics including personal development, digital marketing strategies, content creation, brand building, youth empowerment, and motivational themes. Each presentation is tailored to the audience and event objectives.',
      },
      {
        q: 'Do you offer virtual speaking engagements?',
        a: 'Yes! I offer both in-person and virtual speaking engagements. Virtual sessions can be conducted via Zoom, Google Meet, or your preferred platform.',
      },
      {
        q: 'What are your consultation rates?',
        a: 'Rates vary depending on the scope of work, duration, and specific requirements. Contact me for a personalized quote based on your needs.',
      },
    ],
  },
  {
    category: 'E-Books & Products',
    questions: [
      {
        q: 'How do I purchase and download e-books?',
        a: 'Visit the E-Books page, select your desired book, add it to cart, and complete the checkout process. After payment confirmation, you\'ll receive download links via email.',
      },
      {
        q: 'What formats are your e-books available in?',
        a: 'E-books are typically available in PDF format for easy reading on any device. Some may also be available in EPUB format for e-readers.',
      },
      {
        q: 'Can I get a refund on digital products?',
        a: 'Refunds are available within 7 days of purchase if the content has not been downloaded. Please contact us with your order details for refund requests.',
      },
    ],
  },
  {
    category: 'Technical Support',
    questions: [
      {
        q: 'I\'m having trouble downloading my purchase. What should I do?',
        a: 'First, check your email spam folder for the download link. If you still can\'t find it, contact us at connect@akinolaolujobi.com with your order confirmation, and we\'ll resend the download link.',
      },
      {
        q: 'How do I subscribe to the newsletter?',
        a: 'You can subscribe to our newsletter through the signup form in the footer of any page. Enter your email address and click Subscribe to receive updates, insights, and exclusive content.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Frequently Asked Questions"
        description="Find answers to common questions about Akinola Olujobi's services, bookings, e-books, and more."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              {faqs.map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-12">
                  <h2 className="text-2xl font-heading font-bold mb-6 text-foreground">
                    {section.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {section.questions.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${sectionIdx}-${idx}`}
                        className="border border-border rounded-lg px-6 bg-card"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              <div className="mt-16 text-center p-8 bg-muted rounded-lg">
                <h3 className="text-xl font-heading font-bold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Can't find the answer you're looking for? Feel free to reach out.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
