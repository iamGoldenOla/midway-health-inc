import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { ChevronLeft, ChevronRight } from "lucide-react";
=======

>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
import { Button } from "@/components/ui/button";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import hero7 from "@/assets/hero-7.jpg";
import hero8 from "@/assets/hero-8.jpg";
import hero9 from "@/assets/hero-9.jpg";
import hero10 from "@/assets/hero-10.jpg";

const slides = [
  {
    image: hero1,
    title: "Welcome to Christ The Haven School",
    subtitle: "Excellence & Godliness",
    description: "Nurturing future leaders with quality education and moral values in Ogun State",
  },
  {
    image: hero2,
    title: "Visit to the Alake's Palace",
    subtitle: "Cultural Education",
    description: "Learning about our rich heritage and traditional values",
  },
  {
    image: hero3,
    title: "Educational Excursions",
    subtitle: "Learning Beyond Walls",
    description: "Exploring the world and gaining practical knowledge",
  },
  {
    image: hero4,
    title: "Olumo Rock Adventure",
    subtitle: "Discovering History",
    description: "Students exploring historical landmarks in Ogun State",
  },
  {
    image: hero5,
    title: "Fun Field Trips",
    subtitle: "Learning Together",
    description: "Building bonds and creating lasting memories",
  },
  {
    image: hero6,
    title: "Active Learning",
    subtitle: "Hands-On Education",
    description: "Engaging students through practical experiences",
  },
  {
    image: hero7,
    title: "Career Day Celebrations",
    subtitle: "Inspiring Future Professionals",
    description: "Children exploring different career paths and dreams",
  },
  {
    image: hero8,
    title: "Meet Our Proprietress",
    subtitle: "Mrs Bisola Toriola",
    description: "Dedicated leadership driving excellence in education",
  },
  {
    image: hero9,
    title: "Modern Classrooms",
    subtitle: "Conducive Learning Environment",
    description: "Well-equipped spaces designed for effective learning",
  },
  {
    image: hero10,
    title: "World Reading Day",
    subtitle: "Fostering Love for Books",
    description: "Cultivating a reading culture from an early age",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 gradient-hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
<<<<<<< HEAD
      <div className="absolute inset-0 flex items-center">
=======
      <div className="absolute inset-0 flex items-center justify-center">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
<<<<<<< HEAD
              className="max-w-2xl text-primary-foreground"
=======
              className="max-w-3xl mx-auto text-center text-primary-foreground"
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
            >
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6">
                {slides[currentSlide].subtitle}
              </span>
              <h1 className="heading-display mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
<<<<<<< HEAD
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4">
=======
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                <Button variant="sky" size="lg">
                  Explore Programs
                </Button>
                <Button variant="hero" size="lg">
                  Virtual Tour
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

<<<<<<< HEAD
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-all"
      >
        <ChevronRight size={24} />
      </button>
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-secondary"
                : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
