import { useState, useEffect } from 'react';
import { X, Mic, Sparkles, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const showTimer = setTimeout(() => setIsOpen(true), 20000);
    return () => clearTimeout(showTimer);
  }, []);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (!isOpen) return;
    const hideTimer = setTimeout(() => setIsOpen(false), 3000);
    return () => clearTimeout(hideTimer);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate subscription
    setTimeout(() => {
      toast({
        title: "You're in!",
        description: "Welcome to the family. Expect inspiration in your inbox soon.",
      });
      setIsSubmitting(false);
      setIsOpen(false);
      setEmail('');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>

            {/* Gradient header */}
            <div className="bg-gradient-to-br from-primary via-primary to-navy p-8 pb-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal/10 rounded-full blur-2xl" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-8 h-8 text-coral" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
                Welcome
              </h2>
              <p className="text-primary-foreground/70 text-sm md:text-base leading-relaxed">
                "Your story deserves to be told with excellence — and every great journey begins with a single step."
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-5">
              {/* Service highlights */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mic className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-sm">Need an MC for Your Event?</h3>
                    <p className="text-xs text-muted-foreground">
                      Professional event anchoring that captivates your audience from start to finish.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-sm">Spoken Word Artist</h3>
                    <p className="text-xs text-muted-foreground">
                      Powerful performances that leave lasting impressions and move hearts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Stay Inspired</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-coral hover:bg-coral/90 text-foreground font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe & Get Inspired'}
                </Button>
              </form>

              <p className="text-[11px] text-muted-foreground text-center">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
