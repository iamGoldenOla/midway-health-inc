import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ParallaxSection from '@/components/shared/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Monitor, Share2, BarChart, Target, Globe, Smartphone, ExternalLink } from 'lucide-react';

const digitalServices = [
  {
    title: 'Social Media Marketing',
    description: 'Strategic social media management that grows your audience and engagement.',
    icon: Share2,
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your search rankings and drive organic traffic to your website.',
    icon: BarChart,
  },
  {
    title: 'Facebook & Google Ads',
    description: 'Targeted advertising campaigns that deliver measurable ROI.',
    icon: Target,
  },
  {
    title: 'Website Development',
    description: 'Custom websites that look great and convert visitors into customers.',
    icon: Globe,
  },
  {
    title: 'Email Marketing',
    description: 'Effective email campaigns that nurture leads and drive sales.',
    icon: Smartphone,
  },
  {
    title: 'Analytics & Reporting',
    description: 'Data-driven insights to optimize your digital marketing performance.',
    icon: Monitor,
  },
];

export default function IDigital() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="I Digital"
          subtitle="Driving growth through strategic digital marketing solutions."
          backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
        />

        {/* About Digital */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Monitor className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Digital Excellence for Your Brand
                </h2>
                <p className="text-muted-foreground mb-4">
                  In today's digital-first world, your online presence can make or break your business. 
                  I offer comprehensive digital marketing services designed to help you stand out, 
                  connect with your target audience, and achieve measurable results.
                </p>
                <p className="text-muted-foreground mb-6">
                  From social media strategy to paid advertising, SEO to email marketing, I've got 
                  the expertise to take your digital presence to the next level.
                </p>
                <Link to="/contact">
                  <Button size="lg">Start Your Digital Journey</Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
                  alt="Digital marketing"
                  className="rounded-xl shadow-lg-custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Quote */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&q=80">
          <blockquote className="text-xl md:text-3xl font-heading font-medium text-primary-foreground italic max-w-4xl mx-auto">
            "In the digital age, your online presence is your first impression. 
            Make it count with strategies that convert."
          </blockquote>
          <p className="text-primary-foreground/70 mt-4">— Akinola Olujobi</p>
        </ParallaxSection>

        {/* Digital Services */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Digital Marketing Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {digitalServices.map((service) => (
                <div key={service.title} className="bg-card p-6 rounded-xl shadow-card card-hover">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              My Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {['Discovery', 'Strategy', 'Execution', 'Optimization'].map((step, index) => (
                <div key={step} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-heading font-bold text-foreground">{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* My Platforms */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-6">
              My Digital Platforms
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore my digital marketing agency and academy where you can learn and grow your digital skills.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <a
                href="https://trendtacticsdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-8 rounded-xl shadow-card card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Globe className="w-12 h-12 text-primary" />
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">TrendTactics Digital</h3>
                <p className="text-muted-foreground">
                  My full-service digital marketing agency helping brands grow their online presence and achieve measurable results.
                </p>
              </a>
              <a
                href="https://academy.trendtacticsdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-8 rounded-xl shadow-card card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Monitor className="w-12 h-12 text-primary" />
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">TrendTactics Academy</h3>
                <p className="text-muted-foreground">
                  My online academy for students to learn digital marketing, content creation, and build profitable skills.
                </p>
              </a>
            </div>
          </div>
        </section>

        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
