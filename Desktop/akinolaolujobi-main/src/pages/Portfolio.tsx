import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Facebook } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CTASection from '@/components/shared/CTASection';
import TestimonialSection from '@/components/shared/TestimonialSection';
import Typewriter from '@/components/shared/Typewriter';
import { supabase } from '@/lib/supabase';

const portfolioTypewriterWords = ['Websites', 'Apps', 'Digital Experiences', 'Brand Stories'];

const servicesOffered = [
  'I Teach',
  'I Blog',
  'I Write',
  'I Speak',
  'I Sing',
  'I Digital',
];

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPortfolioItems(data || []);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero
          title="My Portfolio"
          subtitle="Explore the journey, see the results."
          backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
        />

        {/* Typewriter Banner */}
        <section className="bg-gradient-to-r from-primary to-coral py-8 md:py-12">
          <div className="container-custom px-4 md:px-8 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-heading text-white">
              <Typewriter
                words={portfolioTypewriterWords}
                prefix="I build "
                textClassName="text-coral font-bold"
                typeSpeed={80}
                deleteSpeed={40}
                delayBetweenWords={1500}
              />
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              MY <span className="text-primary">PORTFOLIO</span>
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : portfolioItems.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p>New portfolio items coming soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl overflow-hidden shadow-card card-hover group">
                    <a href={item.project_url || '#'} target={item.project_url ? '_blank' : '_self'} rel="noreferrer" className="block relative">
                      <div className="flex items-center gap-2 px-4 py-2 text-primary">
                        <Plus size={16} />
                        <span className="text-sm font-medium">{item.category}</span>
                      </div>
                      <div className="aspect-video bg-muted overflow-hidden">
                        {item.featured_image ? (
                          <img
                            src={item.featured_image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Media</div>
                        )}
                      </div>
                    </a>
                    <div className="p-6">
                      <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Narrative Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              THE ART OF <span className="text-primary">STORYTELLING</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
                  alt="Team collaboration"
                  className="rounded-lg shadow-card"
                />
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
                  alt="Strategy session"
                  className="rounded-lg shadow-card mt-8"
                />
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We embark on crafting compelling narratives that captivate, persuade, and inspire. Copywriting is the art of turning words into wonders. With every phrase, we breathe life into brands, spark connections, and ignite action.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As we envisioned, having asked, and established VACA, let us infuse that same passion, innovation, and transformative energy into your business... unprecedented success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Sidebar Section */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80"
                  alt="Digital marketing strategy"
                  className="w-full rounded-xl shadow-card"
                />
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl border border-primary/20">
                <ul className="space-y-4">
                  {servicesOffered.map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-foreground font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Success */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">Customer Success</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
                  Results That Build Reliability and Royalty
                </h2>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                  alt="Team success"
                  className="rounded-xl shadow-card"
                />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                  <Facebook className="text-primary-foreground" size={32} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary/80">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center mb-12">
              Why Work With Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: '100+', label: 'Projects Completed' },
                { number: '50+', label: 'Happy Clients' },
                { number: '5+', label: 'Years Experience' },
                { number: '24/7', label: 'Support Available' },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-4xl font-bold text-primary-foreground mb-2">{stat.number}</p>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection />
        <CTASection
          title="Let's Create Something Amazing"
          subtitle="Don't settle for the spark. Ignite the fire within your audience. Content that inspires action starts here."
          buttonText="Start Your Project"
        />
      </main>
      <Footer />
    </div>
  );
}
