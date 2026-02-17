import { useState, useEffect, useRef } from "react";
import { Newspaper, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const headlines = [
  "5 Benefits of Home Healthcare for Seniors",
  "Understanding Post-Surgical Recovery at Home",
  "Managing Chronic Conditions with Expert Support",
  "How Companionship Care Improves Mental Health",
  "Tips for Choosing the Right Home Health Aide",
];

const BreakingNewsTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const charIndex = useRef(0);

  useEffect(() => {
    const headline = headlines[currentIndex];

    if (isTyping) {
      if (charIndex.current < headline.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(headline.slice(0, charIndex.current + 1));
          charIndex.current += 1;
        }, 45);
        return () => clearTimeout(timeout);
      } else {
        const pause = setTimeout(() => setIsTyping(false), 2500);
        return () => clearTimeout(pause);
      }
    } else {
      charIndex.current = 0;
      setDisplayedText("");
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
      setIsTyping(true);
    }
  }, [displayedText, isTyping, currentIndex]);

  return (
    <div className="bg-secondary text-secondary-foreground text-xs py-1.5">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 overflow-hidden">
        {/* Left: News ticker */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider shrink-0">
            <Newspaper className="h-3.5 w-3.5" />
            Latest
          </span>
          <span className="h-4 w-px bg-secondary-foreground/30 shrink-0" />
          <Link to="/blog" className="truncate hover:underline">
            {displayedText}
            <span className="inline-block w-px h-3.5 bg-secondary-foreground ml-0.5 animate-pulse align-middle" />
          </Link>
        </div>

        {/* Right: Careers CTA */}
        <Link
          to="/contact"
          className="hidden md:flex items-center gap-1.5 shrink-0 font-semibold hover:text-primary transition-colors"
        >
          <Briefcase className="h-3.5 w-3.5" />
          Start your journey as a caregiver — apply to join our team today!
        </Link>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
