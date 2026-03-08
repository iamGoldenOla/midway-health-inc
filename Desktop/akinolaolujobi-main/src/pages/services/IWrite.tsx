import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ParallaxSection from '@/components/shared/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PenTool, FileText, BookOpen, Newspaper } from 'lucide-react';

const writingServices = [
  {
    title: 'Website Copy',
    description: 'Compelling website content that converts visitors into customers.',
    icon: FileText,
  },
  {
    title: 'Blog Articles',
    description: 'SEO-optimized blog posts that drive traffic and engagement.',
    icon: Newspaper,
  },
  {
    title: 'E-Books & Guides',
    description: 'In-depth resources that establish your authority in your industry.',
    icon: BookOpen,
  },
  {
    title: 'Brand Storytelling',
    description: 'Authentic narratives that connect with your audience emotionally.',
    icon: PenTool,
  },
];

export default function IWrite() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="I Write"
          subtitle="Crafting words that captivate, persuade, and inspire action."
          backgroundImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80"
        />

        {/* About Writing */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <PenTool className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  The Power of Written Words
                </h2>
                <p className="text-muted-foreground mb-4">
                  Every word matters. As a professional writer and content strategist, I craft content 
                  that doesn't just fill space – it tells your story, builds connections, and drives 
                  your business forward.
                </p>
                <p className="text-muted-foreground mb-6">
                  From website copy that converts to blog posts that rank, my writing services are 
                  designed to help you achieve your communication goals with clarity and impact.
                </p>
                <Link to="/contact">
                  <Button size="lg">Get a Quote</Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=600&q=80"
                  alt="Writing"
                  className="rounded-xl shadow-lg-custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Quote */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&q=80">
          <blockquote className="text-xl md:text-3xl font-heading font-medium text-primary-foreground italic max-w-4xl mx-auto">
            "The pen is mightier than the sword. With the right words, 
            you can move mountains and change the world."
          </blockquote>
          <p className="text-primary-foreground/70 mt-4">— Akinola Olujobi</p>
        </ParallaxSection>

        {/* Writing Services */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Writing Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {writingServices.map((service) => (
                <div key={service.title} className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Featured Writing Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-card rounded-xl overflow-hidden shadow-card card-hover">
                  <img
                    src={`https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&q=80`}
                    alt="Writing project"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-foreground mb-2">Brand Copywriting Project</h3>
                    <p className="text-muted-foreground text-sm">
                      Developed comprehensive brand messaging and website copy for a tech startup.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/portfolio">
                <Button variant="outline">View Full Portfolio</Button>
              </Link>
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
