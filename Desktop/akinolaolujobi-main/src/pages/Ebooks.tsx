import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Sparkles, BookOpen, GraduationCap, Star } from 'lucide-react';

import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import EbooksHero from '@/components/shared/EbooksHero';

const ebooks = [
  {
    id: 'ebook-1',
    title: 'The Art of Content Creation',
    description: 'A comprehensive guide to creating compelling content that resonates with your audience.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 'ebook-2',
    title: 'Digital Marketing Mastery',
    description: 'Learn the strategies and tactics that drive real results in the digital landscape.',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 'ebook-3',
    title: 'Brand Storytelling 101',
    description: 'Discover how to tell your brand story in a way that connects and converts.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80',
    rating: 4.7,
    reviews: 156,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Content Creator',
    text: 'The Content Creation guide transformed my approach entirely. My engagement tripled within a month!',
    avatar: 'SJ',
  },
  {
    name: 'Michael Adeyemi',
    role: 'Marketing Manager',
    text: 'Digital Marketing Mastery is packed with actionable strategies. Worth every naira.',
    avatar: 'MA',
  },
  {
    name: 'Grace Okonkwo',
    role: 'Entrepreneur',
    text: 'Brand Storytelling 101 helped me craft a narrative that truly resonates with my audience.',
    avatar: 'GO',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? 'fill-coral text-coral'
              : star - 0.5 <= rating
              ? 'fill-coral/50 text-coral'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export default function Ebooks() {
  const { addItem, state, openCart } = useCart();
  const { toast } = useToast();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (ebook: typeof ebooks[0]) => {
    addItem({
      id: ebook.id,
      title: ebook.title,
      price: ebook.price,
      image: ebook.image,
    });
    
    setAddedItems(prev => new Set(prev).add(ebook.id));
    
    toast({
      title: 'Added to Cart',
      description: `${ebook.title} has been added to your cart.`,
    });

    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(ebook.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <EbooksHero />

        {/* Intro Section */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                Premium Resources
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                Invest in Your Growth
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Each resource is carefully crafted from years of real-world experience to help you master content creation, digital marketing, and brand storytelling.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 text-center shadow-card border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">Practical Guides</h3>
                <p className="text-sm text-muted-foreground">Actionable strategies you can implement immediately.</p>
              </div>
              <div className="bg-card rounded-xl p-6 text-center shadow-card border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">Expert Insights</h3>
                <p className="text-sm text-muted-foreground">Learn from years of industry experience.</p>
              </div>
              <div className="bg-card rounded-xl p-6 text-center shadow-card border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">Lifetime Access</h3>
                <p className="text-sm text-muted-foreground">Buy once and access your resources forever.</p>
              </div>
            </div>
          </div>
        </section>

        {/* E-Books Grid */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Available Resources
              </h2>
              {state.items.length > 0 && (
                <Button onClick={openCart} variant="outline">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Cart ({state.items.length})
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ebooks.map((ebook) => (
                <div key={ebook.id} className="bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border/50">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={ebook.image}
                      alt={ebook.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">{ebook.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={ebook.rating} />
                      <span className="text-xs text-muted-foreground">{ebook.rating} ({ebook.reviews} reviews)</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{ebook.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatPrice(ebook.price)}</span>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(ebook)}
                        variant={addedItems.has(ebook.id) ? "secondary" : "default"}
                        disabled={addedItems.has(ebook.id)}
                      >
                        {addedItems.has(ebook.id) ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                What Readers Say
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Trusted by hundreds of professionals and creators across Nigeria and beyond.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-4 h-4 fill-coral text-coral" />
                    ))}
                  </div>
                  <p className="text-foreground/90 text-sm mb-6 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
