import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Mail, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Email required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Successfully subscribed!", description: "Thank you for subscribing to our newsletter." });
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary via-primary to-navy">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-coral/30 bg-coral/10 text-xs tracking-[0.2em] uppercase text-coral font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Stay Connected
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Join the Inner Circle
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
              Get exclusive insights on content strategy, digital marketing tips, and early access to new resources — delivered weekly.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={200}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-13 pl-11 text-base rounded-xl focus:ring-coral/50"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-coral text-foreground hover:bg-coral/90 h-13 px-8 rounded-xl shadow-lg shadow-coral/20 font-semibold"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
            <p className="text-center text-primary-foreground/40 text-xs mt-4">
              No spam. Unsubscribe anytime. Join 1,000+ subscribers.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
