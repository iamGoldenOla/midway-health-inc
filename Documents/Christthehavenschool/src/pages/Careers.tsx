import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Heart, Users, Send, MapPin, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
<<<<<<< HEAD
=======
import careersBg from "@/assets/parallax/careers-bg.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const benefits = [
  {
    icon: Heart,
    title: "Supportive Environment",
    description: "Work in a nurturing and faith-based community",
  },
  {
    icon: GraduationCap,
    title: "Professional Growth",
    description: "Continuous development and training opportunities",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description: "Join a dedicated team of passionate educators",
  },
];

const openPositions = [
  {
    title: "Primary School Teacher",
    type: "Full-time",
    location: "Asese-Orimerunmu, Ogun State",
    description: "We are seeking passionate primary school teachers to join our team and help shape young minds.",
  },
  {
    title: "Nursery Teacher",
    type: "Full-time",
    location: "Asese-Orimerunmu, Ogun State",
    description: "Join us in nurturing our youngest learners with love, patience, and creativity.",
  },
  {
    title: "Music Instructor",
    type: "Part-time",
    location: "Asese-Orimerunmu, Ogun State",
    description: "Help develop musical talents in our students through engaging lessons and performances.",
  },
];

const Careers = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", position: "", message: "" });
  };

  return (
<<<<<<< HEAD
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-yellow font-medium text-sm uppercase tracking-wider">
              Join Our Team
            </span>
            <h1 className="heading-display mt-4 mb-6">
              Build a <span className="text-yellow">Career</span> with Purpose
            </h1>
            <p className="text-lg opacity-90">
              Join Christ The Haven School and make a difference in the lives of 
              young learners. We're always looking for passionate educators who share 
              our commitment to excellence and godliness.
            </p>
=======
    <main className="min-h-screen relative">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${careersBg})`,
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
          style={{ backgroundImage: `url(${careersBg})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto text-primary-foreground"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-yellow font-medium text-sm uppercase tracking-wider"
            >
              Join Our Team
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="heading-display mt-4 mb-6"
            >
              Build a <span className="text-yellow">Career</span> with Purpose
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg"
            >
              Join Christ The Haven School and make a difference in the lives of 
              young learners. We're always looking for passionate educators who share 
              our commitment to excellence and godliness.
            </motion.p>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
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
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Why Join Us
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Benefits of Working <span className="text-primary">With Us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-secondary" size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
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
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Current Openings
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Available <span className="text-primary">Positions</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border-l-4 border-secondary"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {position.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-secondary">
                        <Clock size={14} />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin size={14} />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="default" className="shrink-0">
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
<<<<<<< HEAD
      <section className="section-padding bg-primary text-primary-foreground">
=======
      <section className="section-padding bg-primary/80 text-primary-foreground backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-yellow font-medium text-sm uppercase tracking-wider">
                Apply Today
              </span>
              <h2 className="heading-section mt-3 mb-6">
                Start Your <span className="text-yellow">Journey</span> With Us
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Ready to make a difference? Submit your application and join our 
                dedicated team of educators at Christ The Haven School.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow/20 flex items-center justify-center">
                  <Briefcase className="text-yellow" size={24} />
                </div>
                <p className="text-sm opacity-90">
                  We respond to all applications within 7 working days
                </p>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card text-foreground rounded-2xl p-8 shadow-card-lg"
            >
              <div className="grid gap-4">
                <Input
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  placeholder="Position Applied For"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Tell us about yourself and why you'd like to join our team..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button type="submit" variant="default" size="lg" className="w-full">
                  <Send size={18} className="mr-2" />
                  Submit Application
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Careers;
