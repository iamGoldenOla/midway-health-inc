import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

import CTASection from '@/components/shared/CTASection';
import TestimonialSection from '@/components/shared/TestimonialSection';
import Typewriter from '@/components/shared/Typewriter';
import ServicesHero from '@/components/shared/ServicesHero';

const serviceTypewriterWords = [
  'Content as Services',
  'Web and App Development',
  'Spoken Word and Digital Marketing',
  'MC (Master of Ceremony)'
];

const services = [
  {
    title: 'Content Writing',
    description: 'From blog posts to website copy, I craft compelling content that resonates with your audience and drives engagement.',
  },
  {
    title: 'Digital Marketing',
    description: 'Strategic digital marketing campaigns that boost your online presence and deliver measurable results.',
  },
  {
    title: 'Spoken Word',
    description: 'Powerful spoken word performances for events, campaigns, and brand storytelling initiatives.',
  },
  {
    title: 'Training & Coaching',
    description: 'Empowering individuals and teams with the skills they need to excel in content creation and marketing.',
  },
  {
    title: 'Online Tutorials',
    description: 'Step-by-step video tutorials and guides that help you master digital skills at your own pace.',
  },
  {
    title: 'Social Media Management',
    description: 'Building and managing your social media presence to grow your audience and community.',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <ServicesHero />

        {/* Services Typewriter Banner */}
        <section className="bg-gradient-to-r from-primary to-coral py-8 md:py-12">
          <div className="container-custom px-4 md:px-8 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-heading text-primary-foreground">
            <Typewriter 
              words={serviceTypewriterWords}
              prefix="I do "
              textClassName="text-coral font-bold"
              typeSpeed={60}
              deleteSpeed={30}
              delayBetweenWords={2000}
            />
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title} className="bg-card p-8 rounded-xl shadow-card card-hover group">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Link to="/contact">
                    <Button variant="default" size="sm" className="group-hover:bg-primary/90 transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection />
        
        {/* Booking Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Book a Session
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to work together? Tell us about your project and schedule a consultation.
            </p>
            <Link to="/booking">
              <Button size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <CTASection 
          title="Ready to Get Started?"
          subtitle="Let's discuss how I can help you achieve your content and marketing goals."
          buttonText="Contact Me Today"
        />
      </main>
      <Footer />
    </div>
  );
}
