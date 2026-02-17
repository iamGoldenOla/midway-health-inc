import { useState, useEffect, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import parallaxBg from "@/assets/midway_5.jpg";

const testimonials = [
  {
    name: "Maria Johnson",
    role: "Patient's Daughter",
    quote:
      "I can't thank Midway Health enough for the incredible support they've given to my mother. Their caregivers not only handle day-to-day tasks but also bring warmth, friendship, and emotional connection that makes all the difference.",
  },
  {
    name: "Robert Williams",
    role: "Patient",
    quote:
      "After my surgery, the home health team helped me recover faster than I expected. Their physical therapy program was outstanding and the nurses were always professional.",
  },
  {
    name: "Sandra Chen",
    role: "Patient's Spouse",
    quote:
      "The companionship care for my husband has been a blessing. He looks forward to every visit. They truly treat him like family and we couldn't be more grateful.",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section
      className="py-20 lg:py-28 relative"
      ref={ref}
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url(${parallaxBg})` }}
      />
      <div className="absolute inset-0 bg-secondary/85" />

      <div className="relative z-10 container mx-auto px-4">
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground">
            What Our Clients Say
          </h2>
          <p className="text-secondary-foreground/70 mt-4 max-w-xl mx-auto">
            We're proud to have touched the lives of many families with our compassionate and reliable care.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-5xl mx-auto overflow-hidden rounded-2xl ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          {/* Left: Caring impact text */}
          <div className="bg-card rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none p-6 sm:p-10 md:p-12 flex flex-col justify-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Caring That Leaves a Lasting Impact
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our caregivers do more than assist — they build trust, connection, and comfort. Every word from our clients reflects our deep commitment to excellence and empathy.
            </p>
            <Link to="/contact">
              <Button className="gradient-primary text-primary-foreground border-0 rounded-xl px-8 shadow-soft hover:opacity-90 transition-opacity w-fit">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Right: Testimonial card */}
          <div className="gradient-primary rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none p-6 sm:p-10 md:p-12 flex flex-col justify-center relative">
            <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-primary-foreground/30 mb-3 sm:mb-4" />
            <p className="text-primary-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 italic min-h-[80px] sm:min-h-[120px]">
              "{testimonials[current].quote}"
            </p>
            <div className="mb-6">
              <p className="font-semibold text-primary-foreground text-lg">{testimonials[current].name}</p>
              <p className="text-primary-foreground/70 text-sm">{testimonials[current].role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
