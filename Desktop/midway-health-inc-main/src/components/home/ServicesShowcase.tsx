import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

import skilledNursingImg from "@/assets/service-skilled-nursing.jpg";
import personalCareImg from "@/assets/service-personal-care.jpg";
import physicalTherapyImg from "@/assets/service-physical-therapy.jpg";
import companionshipImg from "@/assets/service-companionship.jpg";
import postSurgicalImg from "@/assets/service-post-surgical.jpg";
import speechTherapyImg from "@/assets/service-speech-therapy.jpg";

const services = [
  {
    title: "Skilled Nursing",
    desc: "Skilled medical care provided at home to support recovery, chronic conditions, or health monitoring.",
    image: skilledNursingImg,
    slug: "skilled-nursing",
  },
  {
    title: "Personal Care",
    desc: "Professional assistance with daily activities to maintain comfort, dignity, and independence.",
    image: personalCareImg,
    slug: "personal-care",
  },
  {
    title: "Physical Therapy",
    desc: "Rehabilitation programs designed to restore mobility, strength, and quality of life at home.",
    image: physicalTherapyImg,
    slug: "physical-therapy",
  },
  {
    title: "Companionship Care",
    desc: "Compassionate assistance with meaningful social engagement and emotional support.",
    image: companionshipImg,
    slug: "companionship-care",
  },
  {
    title: "Post-Surgical Care",
    desc: "Comprehensive recovery support after surgery including wound care, pain management, and rehabilitation.",
    image: postSurgicalImg,
    slug: "post-surgical-care",
  },
  {
    title: "Speech Therapy",
    desc: "Specialized therapy for speech, language, cognitive-communication, and swallowing disorders.",
    image: speechTherapyImg,
    slug: "speech-therapy",
  },
];

const ServicesShowcase = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [isVisible, isPaused, next]);

  // Get 3 visible cards based on activeIndex
  const getVisibleIndices = () => {
    const total = services.length;
    return [
      activeIndex % total,
      (activeIndex + 1) % total,
      (activeIndex + 2) % total,
    ];
  };

  const visible = getVisibleIndices();
  // Layout: featured (large left), two stacked right
  const featured = services[visible[0]];
  const topRight = services[visible[1]];
  const bottomRight = services[visible[2]];

  const cardMotion = {
    initial: { opacity: 0, scale: 0.92, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: -30 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  return (
    <section
      className="py-20 lg:py-28 gradient-primary relative overflow-hidden"
      ref={ref}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative */}
      <div className="absolute top-10 -left-20 w-72 h-72 rounded-full bg-white/[0.03] blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <span className="text-primary-foreground/80 text-sm font-semibold tracking-wider uppercase">
            What We Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary-foreground mt-3">
            Our Healthcare Services
          </h2>
        </div>

        {/* Bento grid – large left card + two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 min-h-[420px] md:min-h-[480px]">
          {/* Featured large card */}
          <AnimatePresence mode="wait">
            <motion.div key={featured.slug} {...cardMotion} className="h-full">
              <Link
                to={`/services/${featured.slug}`}
                className="group relative block h-full min-h-[280px] md:min-h-full rounded-2xl overflow-hidden"
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-warm/90 text-warm-foreground text-xs font-bold uppercase tracking-wider mb-3">
                    Featured
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    {featured.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 max-w-md">
                    {featured.desc}
                  </p>
                  <span className="text-white font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    LEARN MORE <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right column – two stacked cards */}
          <div className="grid grid-rows-2 gap-5 md:gap-6">
            <AnimatePresence mode="wait">
              <motion.div key={topRight.slug} {...cardMotion} className="h-full">
                <Link
                  to={`/services/${topRight.slug}`}
                  className="group relative block h-full min-h-[180px] rounded-2xl overflow-hidden"
                >
                  <img
                    src={topRight.image}
                    alt={topRight.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                      {topRight.title}
                    </h3>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {topRight.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={bottomRight.slug} {...cardMotion} className="h-full">
                <Link
                  to={`/services/${bottomRight.slug}`}
                  className="group relative block h-full min-h-[180px] rounded-2xl overflow-hidden"
                >
                  <img
                    src={bottomRight.image}
                    alt={bottomRight.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                      {bottomRight.title}
                    </h3>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {bottomRight.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                visible.includes(i)
                  ? "bg-white scale-110"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
