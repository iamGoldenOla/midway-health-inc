import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, Heart, Home, Activity, Hand, MessageCircle, Users, Pill, Scissors, Brain } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import skilledNursingImg from "@/assets/service-skilled-nursing.jpg";
import personalCareImg from "@/assets/service-personal-care.jpg";
import physicalTherapyImg from "@/assets/service-physical-therapy.jpg";
import homeHealthAideImg from "@/assets/service-home-health-aide.jpg";
import companionshipImg from "@/assets/service-companionship.jpg";
import speechTherapyImg from "@/assets/service-speech-therapy.jpg";
import occupationalTherapyImg from "@/assets/service-occupational-therapy.jpg";
import postSurgicalImg from "@/assets/service-post-surgical.jpg";
import medicationImg from "@/assets/service-medication.jpg";
import chronicDiseaseImg from "@/assets/service-chronic-disease.jpg";

interface Service {
  icon: LucideIcon;
  name: string;
  slug: string;
  desc: string;
  tag: string;
  category: string;
  image: string;
}

const services: Service[] = [
  { icon: Stethoscope, name: "Skilled Nursing", slug: "skilled-nursing", desc: "Expert nursing care delivered at home — from wound management to IV therapy and health monitoring.", tag: "CLINICAL", category: "Clinical", image: skilledNursingImg },
  { icon: Heart, name: "Personal Care", slug: "personal-care", desc: "Compassionate support with bathing, grooming, and daily routines to maintain your dignity.", tag: "DAILY LIVING", category: "Daily Living", image: personalCareImg },
  { icon: Activity, name: "Physical Therapy", slug: "physical-therapy", desc: "Personalized rehabilitation programs to restore your strength, mobility, and confidence.", tag: "REHABILITATION", category: "Rehabilitation", image: physicalTherapyImg },
  { icon: Home, name: "Home Health Aide", slug: "home-health-aide", desc: "Dedicated aides providing hands-on assistance with daily living and household support.", tag: "SUPPORT", category: "Support", image: homeHealthAideImg },
  { icon: Users, name: "Companionship Care", slug: "companionship-care", desc: "Warm companionship that combats isolation through meaningful social connection.", tag: "WELLNESS", category: "Wellness", image: companionshipImg },
  { icon: MessageCircle, name: "Speech Therapy", slug: "speech-therapy", desc: "Specialized therapy for speech, language, and swallowing disorders.", tag: "THERAPY", category: "Therapy", image: speechTherapyImg },
  { icon: Hand, name: "Occupational Therapy", slug: "occupational-therapy", desc: "Helping you regain skills needed for everyday tasks and the activities you love.", tag: "REHABILITATION", category: "Rehabilitation", image: occupationalTherapyImg },
  { icon: Scissors, name: "Post-Surgical Care", slug: "post-surgical-care", desc: "Comprehensive recovery support including wound care, pain management, and rehabilitation.", tag: "RECOVERY", category: "Recovery", image: postSurgicalImg },
  { icon: Pill, name: "Medication Management", slug: "medication-management", desc: "Careful oversight of medications for safety, proper dosages, and adherence.", tag: "CLINICAL", category: "Clinical", image: medicationImg },
  { icon: Brain, name: "Chronic Disease Management", slug: "chronic-disease-management", desc: "Ongoing support for diabetes, heart disease, and COPD to help you live well.", tag: "LONG-TERM CARE", category: "Long-Term Care", image: chronicDiseaseImg },
];

const categories = ["All", ...Array.from(new Set(services.map(s => s.category)))];

const ServicesBentoGrid = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All" ? services : services.filter(s => s.category === activeCategory);

  // Auto-scroll for category filters on mobile
  useEffect(() => {
    const scrollContainer = categoryScrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }, 3000);
    };

    // Only auto-scroll on mobile
    if (window.innerWidth < 768) {
      startAutoScroll();
    }

    return () => clearInterval(scrollInterval);
  }, []);

  // Auto-scroll for service cards on mobile
  useEffect(() => {
    const scrollContainer = cardsScrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }, 3000);
    };

    // Only auto-scroll on mobile
    if (window.innerWidth < 768) {
      startAutoScroll();
    }

    return () => clearInterval(scrollInterval);
  }, [filtered]);

  return (
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-10 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <span className="text-warm text-sm font-semibold tracking-wider uppercase">What We Offer</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mt-3">
            Comprehensive Care Solutions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Hover over any service to discover how we can help you or your loved ones.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className={`mb-12 ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4" ref={categoryScrollRef} style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
            <div className="flex gap-2 min-w-max pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Centered Wrap */}
          <div className="hidden md:flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {/* Mobile: Horizontal Scroll Carousel */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4" ref={cardsScrollRef} style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
          <div className="flex gap-4 pb-4" style={{ scrollSnapType: "x mandatory" }}>
            {filtered.map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className={`group rounded-2xl overflow-hidden bg-card border border-border shadow-card transition-all duration-500 hover:shadow-elevated flex-shrink-0 w-[280px] ${isVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${150 + i * 60}ms`, scrollSnapAlign: "start" }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Tag overlay */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {service.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-4 w-4 text-warm shrink-0" />
                      <h3 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {service.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-4 group-hover:gap-2.5 transition-all duration-300">
                      Learn More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`group rounded-2xl overflow-hidden bg-card border border-border shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1.5 hover:scale-[1.02] ${isVisible ? "animate-fade-in" : "opacity-0"
                  }`}
                style={{ animationDelay: `${150 + i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Tag overlay */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {service.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-warm shrink-0" />
                    <h3 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-4 group-hover:gap-2.5 transition-all duration-300">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesBentoGrid;
