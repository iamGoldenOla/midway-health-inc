import { motion } from "framer-motion";
import { BookOpen, Music, Palette, Trophy, Laptop, Users, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import heroBg from "@/assets/hero-2.jpg";
import curriculumImg from "@/assets/curriculum.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const programs = [
  {
    icon: BookOpen,
    title: "Nursery / Early Years (Ages 2-5)",
    description: "Foundation for lifelong learning through play-based education and early literacy programs.",
    features: ["Play-Based Learning", "Early Literacy", "Social Skills Development"],
  },
  {
    icon: Users,
    title: "Primary School (Ages 6-11)",
    description: "Building strong academic foundations with engaging, student-centered teaching methods.",
    features: ["Core Curriculum", "Character Education", "Creative Arts"],
  },
];

const extracurriculars = [
  { icon: Trophy, title: "Chess Club", description: "Strategic thinking and mental development" },
  { icon: Music, title: "Ballet", description: "Grace, discipline, and physical fitness" },
  { icon: Music, title: "Music & Drama", description: "Orchestra, choir, and theatrical productions" },
  { icon: Palette, title: "Visual Arts", description: "Painting, drawing, and creative expression" },
  { icon: Trophy, title: "Sports", description: "Football, athletics, and more" },
];

const comingSoon = [
  { icon: Laptop, title: "Technology & STEM", description: "Coding, robotics, and digital skills - Coming Soon!" },
];

const Academics = () => {
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
=======
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto text-primary-foreground"
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          >
            <h1 className="heading-display mb-4">Academics</h1>
            <p className="text-lg opacity-90">
              Comprehensive educational programs for Nursery and Primary students
            </p>
<<<<<<< HEAD
            <p className="text-yellow font-semibold mt-4">
              School Motto: Excellence & Godliness
            </p>
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </motion.div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Programs
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-4">
              Academic <span className="text-secondary">Programs</span>
            </h2>
            <p className="text-body">
              From nursery through primary school, we offer comprehensive programs 
              tailored to each developmental stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-lg transition-all border-t-4 border-primary"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <program.icon className="text-secondary" size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
<<<<<<< HEAD
=======
              <img
                src={curriculumImg}
                alt="Students in classroom"
                className="rounded-2xl shadow-card-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Curriculum
              </span>
              <h2 className="heading-section text-foreground mt-3 mb-6">
                Quality <span className="text-secondary">Learning</span>
              </h2>
              <p className="text-body mb-6">
                Our curriculum is designed to develop critical thinking, creativity, 
                and communication skills essential for success.
              </p>
              
              <div className="space-y-4">
                {[
                  "Nigerian National Curriculum",
                  "Character & Moral Education",
                  "Creative Arts & Music",
                  "Physical Education",
                  "Social Studies",
                  "Religious Studies",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-secondary-foreground text-xs font-bold">✓</span>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
<<<<<<< HEAD
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                alt="Students in classroom"
                className="rounded-2xl shadow-card-lg"
              />
            </motion.div>
=======
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </div>
        </div>
      </section>

      {/* Extracurriculars */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Beyond The Classroom
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-4">
              Extra-Curricular <span className="text-secondary">Activities</span>
            </h2>
            <p className="text-body">
              We believe in developing well-rounded individuals through diverse 
              extra-curricular programs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {extracurriculars.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <activity.icon className="text-secondary group-hover:text-primary-foreground" size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </motion.div>
            ))}
            
            {/* Coming Soon */}
            {comingSoon.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (extracurriculars.length + index) * 0.1 }}
                className="group bg-card rounded-2xl p-6 shadow-card border-2 border-dashed border-secondary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <activity.icon className="text-secondary" size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {activity.title}
                  </h3>
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full">
                    <Sparkles size={12} />
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-4">Ready to Start Your Academic Journey?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Discover the programs that will shape your child's future. 
              Contact us to learn more about enrollment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-yellow text-primary hover:bg-yellow-dark" size="lg">
                Apply Now
              </Button>
              <Button variant="hero" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Academics;