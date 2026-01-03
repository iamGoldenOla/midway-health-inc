import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import ExcursionCarousel from "@/components/events/ExcursionCarousel";
=======
import CTASection from "@/components/home/CTASection";
import { Button } from "@/components/ui/button";
import ExcursionCarousel from "@/components/events/ExcursionCarousel";
import CulturalDayCarousel from "@/components/events/CulturalDayCarousel";
import EventCarousel from "@/components/events/EventCarousel";
import heroBg from "@/assets/hero-5.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

import excursion1 from "@/assets/gallery/excursion-1.jpg";
import excursion2 from "@/assets/gallery/excursion-2.jpg";
import excursion3 from "@/assets/gallery/excursion-3.jpg";
import excursion4 from "@/assets/gallery/excursion-4.jpg";
import excursion5 from "@/assets/gallery/excursion-5.jpg";
import excursion6 from "@/assets/gallery/excursion-6.jpg";
import excursion7 from "@/assets/gallery/excursion-7.jpg";
import excursion8 from "@/assets/gallery/excursion-8.jpg";
import excursion9 from "@/assets/gallery/excursion-9.jpg";
import excursion10 from "@/assets/gallery/excursion-10.jpg";
<<<<<<< HEAD
import cultural1 from "@/assets/gallery/cultural-1.jpg";
import cultural2 from "@/assets/gallery/cultural-2.jpg";
import reading1 from "@/assets/gallery/reading-1.jpg";
import reading2 from "@/assets/gallery/reading-2.jpg";
import professional1 from "@/assets/gallery/professional-1.jpg";
import professional2 from "@/assets/gallery/professional-2.jpg";
=======
import culturalDay1 from "@/assets/gallery/cultural-day-1.jpg";
import culturalDay2 from "@/assets/gallery/cultural-day-2.jpg";
import culturalDay3 from "@/assets/gallery/cultural-day-3.jpg";
import culturalDay4 from "@/assets/gallery/cultural-day-4.jpg";
import culturalDay5 from "@/assets/gallery/cultural-day-5.jpg";
import culturalDay6 from "@/assets/gallery/cultural-day-6.jpg";
import culturalDay7 from "@/assets/gallery/cultural-day-7.jpg";
import culturalDay8 from "@/assets/gallery/cultural-day-8.jpg";
import culturalDay9 from "@/assets/gallery/cultural-day-9.jpg";
import culturalDay10 from "@/assets/gallery/cultural-day-10.jpg";
import reading1 from "@/assets/gallery/reading-1.jpg";
import reading2 from "@/assets/gallery/reading-2.jpg";
import reading3 from "@/assets/gallery/reading-3.jpg";
import reading4 from "@/assets/gallery/reading-4.jpg";
import reading5 from "@/assets/gallery/reading-5.jpg";
import reading6 from "@/assets/gallery/reading-6.jpg";
import reading7 from "@/assets/gallery/reading-7.jpg";
import reading8 from "@/assets/gallery/reading-8.jpg";
import reading9 from "@/assets/gallery/reading-9.jpg";
import reading10 from "@/assets/gallery/reading-10.jpg";
import professional1 from "@/assets/gallery/professional-1.jpg";
import professional2 from "@/assets/gallery/professional-2.jpg";
import professional3 from "@/assets/gallery/professional-3.jpg";
import professional4 from "@/assets/gallery/professional-4.jpg";
import professional5 from "@/assets/gallery/professional-5.jpg";
import professional6 from "@/assets/gallery/professional-6.jpg";
import professional7 from "@/assets/gallery/professional-7.jpg";
import professional8 from "@/assets/gallery/professional-8.jpg";
import professional9 from "@/assets/gallery/professional-9.jpg";
import professional10 from "@/assets/gallery/professional-10.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const upcomingEvents = [
  {
    id: 1,
    title: "Edufair 2026",
<<<<<<< HEAD
    date: "March 15-17, 2026",
    time: "9:00 AM - 5:00 PM",
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    location: "School Main Campus",
    description: "Join us for our annual education fair featuring interactive exhibitions, workshops, college admissions guidance, and career counseling sessions.",
    featured: true,
  },
  {
    id: 2,
    title: "Parent-Teacher Conference",
<<<<<<< HEAD
    date: "January 20, 2026",
    time: "2:00 PM - 6:00 PM",
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    location: "School Auditorium",
    description: "Discuss your child's progress with teachers and explore ways to support their learning journey.",
    featured: false,
  },
  {
    id: 3,
    title: "Science Fair 2026",
<<<<<<< HEAD
    date: "February 10, 2026",
    time: "10:00 AM - 4:00 PM",
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    location: "Science Block",
    description: "Witness innovative student projects and scientific discoveries at our annual science exhibition.",
    featured: false,
  },
  {
    id: 4,
    title: "Cultural Day Celebration",
<<<<<<< HEAD
    date: "April 5, 2026",
    time: "9:00 AM - 3:00 PM",
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    location: "School Grounds",
    description: "A celebration of cultural diversity with traditional performances, food, and exhibitions.",
    featured: false,
  },
];

const galleryCategories = [
  {
    id: "excursion",
    name: "Excursion",
    description: "Educational trips and outdoor learning adventures",
    images: [
      { src: excursion1, alt: "Students at Olumo Rock excursion" },
      { src: excursion2, alt: "Cultural exhibition at Obasanjo Zoo" },
      { src: excursion3, alt: "Students at Alake's Palace" },
      { src: excursion4, alt: "Students listening attentively at palace" },
      { src: excursion5, alt: "Royal throne at Alake's Palace" },
      { src: excursion6, alt: "Group photo at Alake's Palace" },
      { src: excursion7, alt: "Students seated at palace hall" },
      { src: excursion8, alt: "Students on ornate chairs" },
      { src: excursion9, alt: "Students during palace tour" },
      { src: excursion10, alt: "Group photo at OOPL Wildlife Park" },
    ],
  },
  {
    id: "cultural",
    name: "Cultural Day",
    description: "Celebrating diversity through cultural performances and traditions",
    images: [
<<<<<<< HEAD
      { src: cultural1, alt: "Students in traditional costumes" },
      { src: cultural2, alt: "Cultural dance performance" },
=======
      { src: culturalDay1, alt: "Students in traditional Nigerian attire - group photo" },
      { src: culturalDay2, alt: "Children in colorful cultural costumes" },
      { src: culturalDay3, alt: "Teachers dressed in traditional attire" },
      { src: culturalDay4, alt: "Children showcasing traditional outfits" },
      { src: culturalDay5, alt: "Teacher coordinating cultural activities" },
      { src: culturalDay6, alt: "Boys in traditional northern attire" },
      { src: culturalDay7, alt: "Boys greeting in traditional manner" },
      { src: culturalDay8, alt: "Children in playful traditional poses" },
      { src: culturalDay9, alt: "Students representing diverse Nigerian cultures" },
      { src: culturalDay10, alt: "Girls performing traditional dance" },
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    ],
  },
  {
    id: "reading",
    name: "World Reading Day",
    description: "Promoting literacy and the joy of reading",
    images: [
<<<<<<< HEAD
      { src: reading1, alt: "Students reading in library" },
      { src: reading2, alt: "Storytelling session" },
=======
      { src: reading1, alt: "Teacher with group of young students" },
      { src: reading2, alt: "Students gathered around table" },
      { src: reading3, alt: "Teacher reading to students at table" },
      { src: reading4, alt: "Teacher reading aloud to class" },
      { src: reading5, alt: "Storytelling session in classroom" },
      { src: reading6, alt: "Teacher with students in classroom" },
      { src: reading7, alt: "Students at desks with teacher" },
      { src: reading8, alt: "Reading session with students" },
      { src: reading9, alt: "Parents reading with students" },
      { src: reading10, alt: "Story time with young students" },
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    ],
  },
  {
    id: "professional",
    name: "Professional Day",
    description: "Career exploration and professional development activities",
    images: [
<<<<<<< HEAD
      { src: professional1, alt: "Career day with professionals" },
      { src: professional2, alt: "Students in professional costumes" },
=======
      { src: professional1, alt: "Students as future footballers" },
      { src: professional2, alt: "Students and teachers as chefs" },
      { src: professional3, alt: "Student dressed in engineer outfit" },
      { src: professional4, alt: "Students with cooking utensils" },
      { src: professional5, alt: "Students as future pilots" },
      { src: professional6, alt: "Students in military and pilot uniforms" },
      { src: professional7, alt: "Students dressed as doctors" },
      { src: professional8, alt: "Students as future lawyers" },
      { src: professional9, alt: "Students at career day activities" },
      { src: professional10, alt: "Student as future pilot" },
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    ],
  },
];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("excursion");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
<<<<<<< HEAD
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-display mb-4">Events & Gallery</h1>
            <p className="text-lg opacity-90">
              Explore our vibrant school life through events and memorable moments
            </p>
=======
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-yellow/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white">Mark Your Calendar</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="heading-display text-white mb-6"
            >
              Upcoming <span className="text-sky">Events</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mx-auto text-white/90"
            >
              Join us for memorable experiences that inspire, educate, and bring our community together
            </motion.p>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Upcoming Events */}
      <section className="section-padding bg-background">
=======
      {/* Featured Event */}
      <section className="py-16 bg-background relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-navy-dark to-primary p-1"
          >
            <div className="bg-gradient-to-br from-primary to-navy-dark rounded-[22px] p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-6"
                  >
                    <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
                    Featured Event
                  </motion.span>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4"
                  >
                    {upcomingEvents[0].title}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.9 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-primary-foreground/90 text-lg mb-6 leading-relaxed"
                  >
                    {upcomingEvents[0].description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4 mb-8"
                  >
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <MapPin size={18} className="text-secondary" />
                      <span className="text-sm text-primary-foreground">{upcomingEvents[0].location}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg">
                      Register Now
                    </Button>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="hidden lg:flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="w-64 h-64 bg-gradient-to-br from-secondary/30 to-yellow/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-48 h-48 bg-gradient-to-br from-secondary/40 to-yellow/30 rounded-full flex items-center justify-center">
                        <Calendar className="w-20 h-20 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow rounded-full flex items-center justify-center shadow-lg">
                      <span className="font-bold text-primary text-xl">2026</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Events */}
      <section className="py-16 bg-muted/50">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
<<<<<<< HEAD
            className="mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Mark Your Calendar
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Upcoming <span className="text-secondary">Events</span>
            </h2>
          </motion.div>

          <div className="grid gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 md:p-8 ${
                  event.featured 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card shadow-card"
                }`}
              >
                {event.featured && (
                  <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium mb-4">
                    Featured Event
                  </span>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className={`font-serif text-xl md:text-2xl font-bold mb-2 ${
                      event.featured ? "" : "text-foreground"
                    }`}>
                      {event.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      event.featured ? "opacity-90" : "text-muted-foreground"
                    }`}>
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className={event.featured ? "text-secondary" : "text-secondary"} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className={event.featured ? "text-secondary" : "text-secondary"} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className={event.featured ? "text-secondary" : "text-secondary"} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant={event.featured ? "sky" : "default"} className="shrink-0">
                    Register Now
=======
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              More to Explore
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Other <span className="text-secondary">Events</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.slice(1).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 border-t-4 border-primary"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Calendar className="w-6 h-6 text-secondary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin size={14} className="text-secondary" />
                    <span>{event.location}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                    Learn More
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Memories
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-4">
              Event <span className="text-secondary">Gallery</span>
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Browse through our collection of memorable moments from various school events
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-accent shadow-sm"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Display */}
          {galleryCategories.map((category) => (
            category.id === activeCategory && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
<<<<<<< HEAD
                {/* Carousel for Excursion, Grid for others */}
=======
                {/* All categories use carousel */}
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                {category.id === "excursion" ? (
                  <ExcursionCarousel 
                    images={category.images} 
                    onImageClick={(src) => setSelectedImage(src)} 
                  />
<<<<<<< HEAD
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {category.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-card"
                        onClick={() => setSelectedImage(image.src)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                          <span className="text-primary-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            View Image
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
=======
                ) : category.id === "cultural" ? (
                  <CulturalDayCarousel 
                    images={category.images} 
                    onImageClick={(src) => setSelectedImage(src)} 
                  />
                ) : (
                  <EventCarousel 
                    images={category.images} 
                    onImageClick={(src) => setSelectedImage(src)} 
                  />
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                )}
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
          <button 
            className="absolute top-6 right-6 text-primary-foreground hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <span className="text-3xl">×</span>
          </button>
        </div>
      )}

<<<<<<< HEAD
=======
      <CTASection />
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
      <Footer />
    </main>
  );
};

export default Events;
