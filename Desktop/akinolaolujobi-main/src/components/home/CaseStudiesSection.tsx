import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const caseStudies = [
  {
    title: 'Leading Praise & Worship',
    client: 'Church & Ministry Events',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    description: 'Leading dynamic praise and worship sessions for congregations of over 500 members, creating powerful atmospheres of worship that unite and uplift entire communities.',
    metrics: [
      { label: 'Congregation', value: '500+', icon: Users },
      { label: 'Sessions Led', value: '200+', icon: TrendingUp },
      { label: 'Engagement', value: '98%', icon: BarChart3 },
    ],
    tags: ['Worship Leading', 'Music Ministry', 'Live Performance'],
  },
  {
    title: 'Spoken Word Performances',
    client: 'Events & Conferences',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    description: 'Delivering captivating spoken word pieces to audiences of over 700 people at conferences, church events, and corporate gatherings — inspiring hearts and provoking thought through the power of words.',
    metrics: [
      { label: 'Audience Reached', value: '700+', icon: Users },
      { label: 'Events', value: '50+', icon: TrendingUp },
      { label: 'Impact Rating', value: '95%', icon: BarChart3 },
    ],
    tags: ['Spoken Word', 'Public Speaking', 'Creative Arts'],
  },
  {
    title: 'Online Tutoring for Pupils',
    client: 'Students & Parents',
    image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80',
    description: 'Providing personalised online tutoring sessions that help pupils excel academically, covering key subjects with tailored lesson plans and interactive teaching methods.',
    metrics: [
      { label: 'Students Taught', value: '150+', icon: Users },
      { label: 'Pass Rate', value: '96%', icon: TrendingUp },
      { label: 'Satisfaction', value: '99%', icon: BarChart3 },
    ],
    tags: ['Online Tutoring', 'Education', 'Academic Support'],
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom px-4 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Results That Matter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real projects, real impact. Here's how we've helped brands and organizations achieve extraordinary outcomes.
          </p>
        </AnimatedSection>

        <div className="space-y-8 lg:space-y-12">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.title} animation="fadeUp" delay={index * 150}>
              <div className={`group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 border border-border/50 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } lg:flex`}>
                {/* Image */}
                <div className={`relative lg:w-[45%] h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-primary-foreground/90 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-xs text-coral font-semibold uppercase tracking-widest mb-2">{study.client}</p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="text-center p-3 rounded-xl bg-muted/50 border border-border/30">
                        <metric.icon className="w-4 h-4 text-coral mx-auto mb-1.5" />
                        <div className="text-lg md:text-xl font-heading font-bold text-foreground">{metric.value}</div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link to="/portfolio">
                    <Button variant="outline" className="group/btn border-primary/30 hover:bg-primary hover:text-primary-foreground">
                      View Full Case Study
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
