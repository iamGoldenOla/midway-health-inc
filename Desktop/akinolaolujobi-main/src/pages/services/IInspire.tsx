import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ParallaxSection from '@/components/shared/ParallaxSection';
import VisionMission from '@/components/shared/VisionMission';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lightbulb, Heart, Sparkles, Target } from 'lucide-react';

const inspirationalTopics = [
  {
    title: 'Purpose Discovery',
    description: 'Helping individuals uncover their unique purpose and calling.',
    icon: Target,
  },
  {
    title: 'Overcoming Challenges',
    description: 'Empowering people to rise above obstacles and adversity.',
    icon: Sparkles,
  },
  {
    title: 'Faith & Life',
    description: 'Integrating spiritual principles with everyday living.',
    icon: Heart,
  },
  {
    title: 'Dream Activation',
    description: 'Igniting the courage to pursue and achieve your dreams.',
    icon: Lightbulb,
  },
];

export default function IInspire() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="I Inspire"
          subtitle="Igniting hope, courage, and purpose in hearts around the world."
          backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
        />

        {/* About Inspiring */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Lightbulb className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Lighting the Fire Within
                </h2>
                <p className="text-muted-foreground mb-4">
                  Everyone has a spark of greatness within them. My mission is to help ignite that 
                  flame through inspirational messages, motivational speaking, and life coaching 
                  that transforms perspectives and unlocks potential.
                </p>
                <p className="text-muted-foreground mb-6">
                  Whether through keynote speeches, motivational sessions, or one-on-one coaching, 
                  I'm committed to helping individuals and organizations discover their purpose 
                  and pursue their dreams with passion.
                </p>
                <Link to="/contact">
                  <Button size="lg">Book an Inspiration Session</Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80"
                  alt="Inspiration"
                  className="rounded-xl shadow-lg-custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Quote */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80">
          <blockquote className="text-xl md:text-3xl font-heading font-medium text-primary-foreground italic max-w-4xl mx-auto">
            "Your story is not over. The best chapters are still being written. 
            Rise up, embrace your purpose, and inspire the world around you."
          </blockquote>
          <p className="text-primary-foreground/70 mt-4">— Akinola Olujobi</p>
        </ParallaxSection>

        {/* Inspirational Topics */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Inspirational Topics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {inspirationalTopics.map((topic) => (
                <div key={topic.title} className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
                  <topic.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{topic.title}</h3>
                  <p className="text-muted-foreground text-sm">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Life Coaching */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Personal Coaching
              </h2>
              <p className="text-muted-foreground mb-8">
                Take your personal and professional life to the next level with one-on-one coaching 
                sessions designed to help you clarify your vision, overcome obstacles, and achieve 
                your goals with confidence.
              </p>
              <Link to="/contact">
                <Button size="lg">Schedule a Discovery Call</Button>
              </Link>
            </div>
          </div>
        </section>

        <VisionMission />

        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
