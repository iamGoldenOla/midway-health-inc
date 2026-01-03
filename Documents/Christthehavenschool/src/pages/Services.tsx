import { motion } from "framer-motion";
import { BookOpen, Shield, Music, Heart, Users, Sparkles, Trophy, Palette } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import servicesBg from "@/assets/parallax/services-bg.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const services = [
  {
    icon: BookOpen,
    title: "Quality Education",
    description: "Our curriculum follows the Nigerian National Educational standards while incorporating modern teaching methods and character development.",
    features: ["Experienced Teachers", "Small Class Sizes", "Interactive Learning", "Regular Assessments"]
  },
  {
    icon: Shield,
    title: "Safety & Security",
    description: "Security surveillance and trained personnel ensure a safe learning environment for all students and staff.",
    features: ["Secure Premises", "Security Personnel", "Visitor Management", "Emergency Protocols"]
  },
  {
    icon: Music,
    title: "Extra-Curricular Activities",
    description: "A wide range of activities including music, arts, drama, and sports to nurture talents and build well-rounded individuals.",
    features: ["Music & Dance", "Arts & Crafts", "Drama Club", "Various Sports"]
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "On-site first aid support, regular health awareness, and wellness programs to ensure student well-being.",
    features: ["First Aid Support", "Health Education", "Wellness Programs", "Safe Environment"]
  },
  {
    icon: Users,
    title: "Parent Engagement",
    description: "Regular communication channels and events to keep parents involved in their children's educational journey.",
    features: ["Parent Meetings", "Progress Reports", "Open Days", "Communication Channels"]
  }
];

const clubs = [
  {
    icon: Trophy,
    title: "Chess Club",
    description: "Develop strategic thinking and mental agility through the game of chess.",
  },
  {
    icon: Music,
    title: "Ballet Club",
    description: "Learn grace, discipline, and coordination through ballet dance.",
  },
  {
    icon: Palette,
    title: "Art & Craft Club",
    description: "Express creativity through various art forms and craft projects.",
  },
  {
    icon: Music,
    title: "Music Club",
    description: "Explore musical talents through singing, instruments, and performances.",
  },
];

const comingSoonServices = [
  "School Transportation",
  "ICT & Digital Learning Lab",
  "Nutritious Meal Program",
  "Science Laboratory",
];

const Services = () => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-display text-primary-foreground mb-6">
              Our Services
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive services designed to support every aspect of your child's 
              educational journey at Christ The Haven School.
            </p>
            <p className="text-yellow font-semibold mt-4">
              School Motto: Excellence & Godliness
            </p>
=======
    <div className="min-h-screen relative">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${servicesBg})`,
          backgroundAttachment: "fixed"
        }}
      />
      <div className="fixed inset-0 -z-10 bg-background/40" />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${servicesBg})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-primary-foreground"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="heading-display mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl max-w-3xl mx-auto"
            >
              Comprehensive services designed to support every aspect of your child's 
              educational journey at Christ The Haven School.
            </motion.p>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
<<<<<<< HEAD
      <section className="section-padding">
=======
      <section className="section-padding bg-background/50 backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 group border-t-4 border-primary"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-secondary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}
<<<<<<< HEAD
      <section className="section-padding bg-muted">
=======
      <section className="section-padding bg-muted/80 backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Student Activities
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-4">
              Our <span className="text-secondary">Clubs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer various clubs to help students explore their interests and develop new skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map((club, index) => (
              <motion.div
                key={club.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-card-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  <club.icon className="text-secondary group-hover:text-primary-foreground" size={28} />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">{club.title}</h3>
                <p className="text-sm text-muted-foreground">{club.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
<<<<<<< HEAD
      <section className="section-padding bg-background">
=======
      <section className="section-padding bg-background/50 backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="flex items-center justify-center gap-2 text-secondary font-medium text-sm uppercase tracking-wider mb-3">
              <Sparkles size={16} />
              Coming Soon
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Future <span className="text-secondary">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are continuously working to expand our services to better serve our students and parents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {comingSoonServices.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm border-2 border-dashed border-secondary/30"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles size={14} className="text-secondary" />
                  <span className="text-xs text-secondary font-medium">Coming Soon</span>
                </div>
                <p className="font-medium text-foreground">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
<<<<<<< HEAD
      <section className="section-padding bg-muted">
=======
      <section className="section-padding bg-muted/80 backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Additional Support Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We go the extra mile to ensure every child receives the support they need to thrive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "After-School Care",
              "Counseling Services",
              "Library Access",
              "Playground Facilities"
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-primary"
              >
                <p className="font-medium text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<<<<<<< HEAD
      <section className="section-padding gradient-primary">
=======
      <section className="section-padding gradient-primary backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section text-primary-foreground mb-6">
              Ready to Give Your Child the Best?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join the Christ The Haven School family and give your child access to 
              quality education and comprehensive support services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow text-primary hover:bg-yellow-dark">
                <Link to="/contact">Enquire Now</Link>
              </Button>
              <Button asChild size="lg" variant="hero">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;