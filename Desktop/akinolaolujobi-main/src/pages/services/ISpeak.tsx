import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ParallaxSection from '@/components/shared/ParallaxSection';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mic, Users, Star, Calendar } from 'lucide-react';
import akinMC from '@/assets/akin-mc.jpg';

const speakingTopics = [
  'Content Marketing & Strategy',
  'Personal Branding',
  'Digital Transformation',
  'Storytelling for Business',
  'Spoken Word Poetry',
  'Youth Empowerment',
];

const speakingEvents = [
  {
    title: 'Corporate Conferences',
    description: 'Engage your team with powerful keynote speeches that inspire action and drive results.',
    icon: Users,
  },
  {
    title: 'Workshops & Training',
    description: 'Interactive sessions designed to equip participants with practical skills and knowledge.',
    icon: Star,
  },
  {
    title: 'Seminars & Webinars',
    description: 'Virtual and in-person presentations tailored to your audience and objectives.',
    icon: Calendar,
  },
];

export default function ISpeak() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="I Speak"
          subtitle="Captivating audiences with powerful words and inspiring messages."
          backgroundImage="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=80"
        />

        {/* About Speaking */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Mic className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Words That Move Hearts & Minds
                </h2>
                <p className="text-muted-foreground mb-4">
                  As a seasoned speaker and spoken word artist, I bring a unique blend of storytelling, 
                  inspiration, and practical insights to every stage. Whether it's a corporate conference, 
                  church event, or creative gathering, I deliver messages that resonate and transform.
                </p>
                <p className="text-muted-foreground mb-6">
                  My speaking engagements are tailored to your audience's needs, combining powerful 
                  narratives with actionable takeaways that leave a lasting impact.
                </p>
                <Link to="/contact">
                  <Button size="lg">Book Me to Speak</Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80"
                  alt="Speaking engagement"
                  className="rounded-xl shadow-lg-custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Quote */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80">
          <blockquote className="text-xl md:text-3xl font-heading font-medium text-primary-foreground italic max-w-4xl mx-auto">
            "Words have the power to inspire nations, change minds, and ignite movements. 
            Every speech is an opportunity to plant seeds of transformation."
          </blockquote>
          <p className="text-primary-foreground/70 mt-4">— Akinola Olujobi</p>
        </ParallaxSection>

        {/* MC / Event Host Section */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="fadeRight">
                <span className="text-coral font-semibold text-sm uppercase tracking-wider">Master of Ceremonies</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
                  Your Event, My Voice
                </h2>
                <p className="text-muted-foreground mb-4">
                  Beyond keynote speaking, I bring energy, wit, and professionalism as a Master of Ceremonies. 
                  From corporate galas and award nights to church programs and creative showcases — I keep 
                  your audience engaged and your event flowing seamlessly.
                </p>
                <p className="text-muted-foreground mb-6">
                  With a commanding stage presence and the ability to read the room, I ensure every moment 
                  of your event is memorable. Let me be the voice that ties your event together.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-coral hover:bg-coral-dark text-foreground">
                    Book Me as MC
                  </Button>
                </Link>
              </AnimatedSection>
              <AnimatedSection animation="fadeLeft">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-coral/20 rounded-2xl" />
                  <img
                    src={akinMC}
                    alt="Akinola Olujobi as Master of Ceremonies"
                    className="relative rounded-2xl w-full max-w-md mx-auto shadow-lg object-cover aspect-[3/4]"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Speaking Topics */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Speaking Topics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {speakingTopics.map((topic) => (
                <div key={topic} className="bg-card p-6 rounded-xl shadow-card text-center">
                  <p className="font-heading font-bold text-foreground">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Events I Speak At
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {speakingEvents.map((event) => (
                <div key={event.title} className="bg-card p-8 rounded-xl shadow-card text-center card-hover">
                  <event.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              ))}
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
