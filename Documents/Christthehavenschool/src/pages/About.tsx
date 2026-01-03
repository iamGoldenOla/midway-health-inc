import { motion } from "framer-motion";
import { 
  Target, 
  Eye,
  Heart,
  Star,
  Users
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import proprietressImage from "@/assets/proprietress.jpg";
<<<<<<< HEAD
=======
import aboutBg from "@/assets/parallax/about-bg.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Striving for the highest standards in academics, character, and conduct.",
  },
  {
    icon: Heart,
    title: "Godliness",
    description: "Nurturing spiritual growth and moral uprightness in all situations.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Fostering a sense of belonging and collaborative spirit among all stakeholders.",
  },
  {
    icon: Star,
    title: "Innovation",
    description: "Embracing creativity and new ideas to enhance learning experiences.",
  },
];

const About = () => {
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
            <h1 className="heading-display mb-4">About Our School</h1>
            <p className="text-lg opacity-90">
              Discover the legacy of excellence at Christ The Haven School
            </p>
            <p className="text-yellow font-semibold mt-4">
              School Motto: Excellence & Godliness
            </p>
=======
    <main className="min-h-screen relative">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${aboutBg})`,
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
          style={{ backgroundImage: `url(${aboutBg})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto text-primary-foreground"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="heading-display mb-4"
            >
              About Our School
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg"
            >
              Discover the legacy of excellence at Christ The Haven School
            </motion.p>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </motion.div>
        </div>
      </section>

      {/* History Section */}
<<<<<<< HEAD
      <section className="section-padding bg-background">
=======
      <section className="section-padding bg-background/50 backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="heading-section text-foreground mt-3 mb-6">
                A Legacy of <span className="text-secondary">Excellence</span>
              </h2>
              <p className="text-body mb-6">
                Christ The Haven School is a premier Nursery and Primary educational 
                institution located in Ogun State, Nigeria. We are committed to providing 
                quality education in a nurturing environment rooted in strong moral values 
                and godliness.
              </p>
              <p className="text-body mb-6">
                Over the years, we have consistently maintained high academic 
                standards while nurturing well-rounded individuals who excel not just 
                in academics but in character, creativity, and community service.
              </p>
              <p className="text-body">
                Today, with over 100 students and 15+ dedicated educators, we continue 
                to uphold our founding principles while embracing modern educational 
                innovations to prepare our students for the challenges of tomorrow.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop"
                alt="School building"
                className="rounded-2xl shadow-card-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
                <p className="font-serif text-4xl font-bold">10+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proprietress Section */}
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
              Leadership
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Meet Our <span className="text-secondary">Proprietress</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card-lg grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img
                  src={proprietressImage}
                  alt="Mrs Bisola Toriola - Proprietress"
                  className="w-full h-auto rounded-2xl shadow-lg border-4 border-secondary"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Mrs Bisola Toriola
                </h3>
                <p className="text-secondary font-semibold mb-4">Proprietress</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  With a passion for education and child development, Mrs Bisola Toriola 
                  founded Christ The Haven School with a vision to provide quality education 
                  rooted in excellence and godliness.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Under her dedicated leadership, the school has grown to become a 
                  beacon of academic excellence and moral values in Ogun State, Nigeria, 
                  nurturing young minds to become future leaders.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
<<<<<<< HEAD
      <section className="section-padding bg-background">
=======
      <section className="section-padding bg-background/50 backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12"
            >
              <div className="w-16 h-16 rounded-xl bg-yellow flex items-center justify-center mb-6">
                <Eye className="text-primary" size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
              <p className="opacity-90 leading-relaxed">
                To be a leading educational institution that nurtures globally competitive, 
                morally upright, and socially responsible individuals who will be agents 
                of positive change in their communities and the world.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 md:p-12 shadow-card border-t-4 border-primary"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="text-secondary" size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide comprehensive, high-quality education that develops the intellectual, 
                physical, social, emotional, and spiritual potential of every student in a 
                safe, nurturing, and stimulating environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Our Core <span className="text-secondary">Values</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-card rounded-2xl p-8 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-secondary" size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
<<<<<<< HEAD
      <section className="section-padding bg-primary text-primary-foreground">
=======
      <section className="section-padding bg-primary/80 text-primary-foreground backdrop-blur-sm">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-4">Join Our School Community</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Experience the Christ The Haven difference. Schedule a visit to our campus 
              and discover why we are the choice for quality education.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-yellow text-primary hover:bg-yellow-dark" size="lg">
                Apply for Admission
              </Button>
              <Button variant="hero" size="lg">
                Schedule a Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;