import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Lightbulb, PenTool, Mic, Monitor, Music, ArrowRight } from 'lucide-react';
import ParallaxSection from '@/components/shared/ParallaxSection';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { useCountUp } from '@/hooks/useCountUp';

const services = [
  {
    icon: GraduationCap,
    title: 'I Teach.',
    description: 'Knowledge is a gift, and we believe in sharing it. From training brand strategists to coaching teams, we create space for growth and development.',
    color: 'bg-primary',
    link: '/services/i-teach',
  },
  {
    icon: Lightbulb,
    title: 'I Inspire.',
    description: 'Inspiration, at its very nucleus, is contagious. We ignite the spark through your craft that will evoke a tribe of growth and great achievement.',
    color: 'bg-background',
    link: '/services/i-inspire',
  },
  {
    icon: PenTool,
    title: 'I Write.',
    description: 'Words are our currency, stories our craft. For brands looking to leave marks — copywriting, ads, scripts, ghost writing, articles or short stories.',
    color: 'bg-primary',
    link: '/services/i-write',
  },
  {
    icon: Mic,
    title: 'I Speak.',
    description: 'The power of a spoken word is captivating — from creative word poetry to powerful messages guiding people toward self-improvement.',
    color: 'bg-background',
    link: '/services/i-speak',
  },
  {
    icon: Monitor,
    title: 'I Digital.',
    description: 'As digital strategists, we craft every project to grab attention and deliver results with storytelling-driven approaches.',
    color: 'bg-primary',
    link: '/services/i-digital',
  },
  {
    icon: Music,
    title: 'I Sing.',
    description: 'Music has always been our rhythm. Soulful voice creating songs that uplift and inspire with messages of hope, compassion, and joy.',
    color: 'bg-background',
    link: '/services/i-sing',
  },
];

export default function WhatIDoSection() {
  const years = useCountUp({ end: 10, duration: 2000 });
  const projects = useCountUp({ end: 500, duration: 2500 });
  const clients = useCountUp({ end: 200, duration: 2000 });
  const events = useCountUp({ end: 50, duration: 1800 });

  const stats = [
    { counter: years, suffix: '+', label: 'Years Experience' },
    { counter: projects, suffix: '+', label: 'Projects Done' },
    { counter: clients, suffix: '+', label: 'Happy Clients' },
    { counter: events, suffix: '+', label: 'Speaking Events' },
  ];

  return (
    <>
      <section className="section-padding bg-muted">
        <div className="container-custom px-4 md:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We craft compelling stories across mediums. Your vision becomes our canvas, and with each word, we paint a picture that ignites emotions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.title}
                animation="fadeUp"
                delay={index * 80}
                className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  service.color === 'bg-primary'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-card-foreground shadow-card hover:shadow-hover'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  service.color === 'bg-primary' ? 'bg-primary-foreground/10' : 'bg-primary/10'
                }`}>
                  <service.icon
                    className={`w-7 h-7 ${
                      service.color === 'bg-primary' ? 'text-coral' : 'text-primary'
                    }`}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-3">
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${
                  service.color === 'bg-primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {service.description}
                </p>
                <Link to={service.link}>
                  <Button
                    variant="default"
                    size="sm"
                    className={`group/btn ${
                      service.color === 'bg-primary'
                        ? 'bg-coral text-foreground hover:bg-coral/90'
                        : ''
                    }`}
                  >
                    Read More
                    <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
        overlayOpacity="bg-navy/70"
        minHeight="min-h-[300px]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center" ref={stat.counter.ref}>
              <div className="text-4xl md:text-5xl font-bold text-coral mb-2">
                {stat.counter.count}{stat.suffix}
              </div>
              <div className="text-primary-foreground/70 text-sm tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </ParallaxSection>
    </>
  );
}
