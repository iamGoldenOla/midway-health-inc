import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ParallaxSection from '@/components/shared/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Music, Heart, Users, Play } from 'lucide-react';

const musicServices = [
  {
    title: 'Worship Leading',
    description: 'Ushering congregations into the presence of God through anointed worship.',
    icon: Heart,
  },
  {
    title: 'Live Performances',
    description: 'Soul-stirring musical performances for events and gatherings.',
    icon: Music,
  },
  {
    title: 'Corporate Events',
    description: 'Musical entertainment for corporate functions and celebrations.',
    icon: Users,
  },
  {
    title: 'Recording Sessions',
    description: 'Studio recordings and collaborations for musical projects.',
    icon: Play,
  },
];

export default function ISing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="I Sing"
          subtitle="Soul-stirring melodies that touch hearts and lift spirits."
          backgroundImage="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80"
        />

        {/* About Singing */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Music className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Music That Moves the Soul
                </h2>
                <p className="text-muted-foreground mb-4">
                  Music is more than sound – it's a language that speaks directly to the soul. 
                  As a worship leader and vocalist, I bring passion, authenticity, and anointing 
                  to every note I sing.
                </p>
                <p className="text-muted-foreground mb-6">
                  Whether leading worship in a church service, performing at a concert, or 
                  ministering at a special event, my goal is to create an atmosphere where 
                  hearts are touched and lives are transformed.
                </p>
                <Link to="/contact">
                  <Button size="lg">Book for an Event</Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80"
                  alt="Music performance"
                  className="rounded-xl shadow-lg-custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Quote */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&q=80">
          <blockquote className="text-xl md:text-3xl font-heading font-medium text-primary-foreground italic max-w-4xl mx-auto">
            "Music is the universal language that connects hearts across all boundaries. 
            Through melody and worship, we experience the divine."
          </blockquote>
          <p className="text-primary-foreground/70 mt-4">— Akinola Olujobi</p>
        </ParallaxSection>

        {/* Music Services */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Music Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {musicServices.map((service) => (
                <div key={service.title} className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Placeholder */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Watch & Listen
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Music & Performance Videos Coming Soon</p>
                </div>
              </div>
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
