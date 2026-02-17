import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles, Sun, HandHeart, Users, Sunrise, Shield, Home, Star } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface Encouragement {
  quote: string;
  author: string;
  Icon: LucideIcon;
}

const encouragements: Encouragement[] = [
  {
    quote: "Healing is not linear, but every step forward matters. You are stronger than you know.",
    author: "Midway Health Team",
    Icon: Heart,
  },
  {
    quote: "Your body has an incredible ability to heal. Trust the process and be gentle with yourself.",
    author: "Dr. Sarah Mitchell",
    Icon: Star,
  },
  {
    quote: "You are not alone on this journey. We believe in your recovery and walk beside you every step.",
    author: "Midway Health Team",
    Icon: Users,
  },
  {
    quote: "Rest when you need to, but never give up. Better days are ahead and we're here to help you get there.",
    author: "Nurse Patricia Williams",
    Icon: Sunrise,
  },
  {
    quote: "Courage doesn't mean you don't feel afraid. It means you keep going despite the fear. You've got this.",
    author: "Dr. James Okonkwo",
    Icon: Shield,
  },
  {
    quote: "Every sunrise brings new hope. Your health journey is a testament to your resilience and strength.",
    author: "Midway Health Team",
    Icon: Sun,
  },
  {
    quote: "Home is where healing happens best. Surrounded by love, comfort, and expert care — you will thrive.",
    author: "Midway Health Team",
    Icon: Home,
  },
  {
    quote: "Faith and medicine work hand in hand. We care, but God heals. Trust in both.",
    author: "Midway Health Team",
    Icon: HandHeart,
  },
];

const POPUP_INTERVAL = 10 * 60 * 1000; // 10 minutes
const AUTO_CLOSE_DELAY = 7000; // 7 seconds

const EncouragementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPopup = useCallback(() => {
    setCurrentIndex(Math.floor(Math.random() * encouragements.length));
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(showPopup, 2 * 60 * 1000);
    const interval = setInterval(showPopup, POPUP_INTERVAL);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showPopup]);

  // Auto-close after 7 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setIsVisible(false), AUTO_CLOSE_DELAY);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const current = encouragements[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-card rounded-3xl shadow-elevated border border-border max-w-md w-full p-8 pointer-events-auto overflow-hidden">
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-warm to-primary" />

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Icon */}
                <div className="relative mx-auto mb-6">
                  <div className="w-16 h-16 rounded-full bg-warm/10 flex items-center justify-center mx-auto">
                    <current.Icon className="h-8 w-8 text-warm" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-warm animate-pulse" />
                </div>

                {/* Label */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
                  <Heart className="h-3 w-3" />
                  A Word of Encouragement
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl font-display font-semibold text-foreground leading-relaxed mb-4">
                  "{current.quote}"
                </blockquote>

                {/* Author */}
                <p className="text-sm text-muted-foreground">
                  — {current.author}
                </p>

                {/* Divider */}
                <div className="h-px bg-border my-6" />

                {/* CTA */}
                <p className="text-xs text-muted-foreground">
                  We're here for you. Call{" "}
                  <a href="tel:+13122989124" className="text-primary font-semibold hover:underline">
                    (312) 298-9124
                  </a>{" "}
                  anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EncouragementPopup;
