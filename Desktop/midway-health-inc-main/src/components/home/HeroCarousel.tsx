import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import midway1 from "@/assets/midway_1.jpg";
import midway2 from "@/assets/midway_2.jpg";
import midway6 from "@/assets/midway_6.jpg";
import midway7 from "@/assets/midway_7.jpg";
import midway9 from "@/assets/midway_9.jpg";

const slides = [
  {
    image: midway1,
    headline: "Compassionate Care,\nRight at Home",
    sub: "Trusted home healthcare services tailored to your needs. We bring professional medical care to the comfort of your home.",
  },
  {
    image: midway2,
    headline: "Expert Rehabilitation\nServices",
    sub: "Our licensed therapists help you recover strength, mobility, and independence with personalized treatment plans.",
  },
  {
    image: midway6,
    headline: "Your Health,\nOur Priority",
    sub: "From skilled nursing to chronic disease management, we provide comprehensive care that you can rely on.",
  },
  {
    image: midway7,
    headline: "A Team You\nCan Trust",
    sub: "Our dedicated healthcare professionals work together to deliver the highest standard of home-based care.",
  },
  {
    image: midway9,
    headline: "Advanced Medical\nExpertise",
    sub: "State-of-the-art diagnostics and treatment plans guided by experienced physicians and specialists.",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextIndex = (current + 1) % slides.length;

  return (
    <section className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] min-h-[480px] md:min-h-[600px] overflow-hidden bg-secondary">
      {/* Preload next image */}
      <img src={slides[nextIndex].image} alt="" className="hidden" />

      {/* Background layer: previous image stays visible to prevent white flash */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* Animated foreground layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-[1]"
        >
          <img
            src={slides[current].image}
            alt="Healthcare"
            className="w-full h-full object-cover object-top"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center" style={{ zIndex: 2 }}>
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line mb-4 md:mb-6 drop-shadow-lg">
                {slides[current].headline}
              </h1>
              <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-lg mb-8 md:mb-14 leading-relaxed drop-shadow-md">
                {slides[current].sub}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-warm text-warm-foreground border-0 rounded-xl px-8 shadow-lg hover:opacity-90 transition-opacity text-base font-semibold">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+13122989124" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-xl px-8 bg-warm text-warm-foreground hover:bg-warm/90 text-base font-semibold shadow-lg">
                    <Phone className="mr-2 h-5 w-5" /> Call Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
