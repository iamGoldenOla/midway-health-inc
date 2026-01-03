import { motion } from "framer-motion";
import { Mail, Phone, Award } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
<<<<<<< HEAD
import proprietressImg from "@/assets/proprietress.jpg";
=======
import CTASection from "@/components/home/CTASection";
import proprietressImg from "@/assets/proprietress.jpg";
import kemiObakpolor from "@/assets/staff/kemi-obakpolor.jpg";
import blessingJaphet from "@/assets/staff/blessing-japhet.jpg";
import abiodunOlorunsuyi from "@/assets/staff/abiodun-olorunsuyi.jpg";
import dorisAkalazu from "@/assets/staff/doris-akalazu.jpg";
import julianaIyedupe from "@/assets/staff/juliana-iyedupe.jpg";
import modupeOmezi from "@/assets/staff/modupe-omezi.jpg";
import wunmiAzeez from "@/assets/staff/wunmi-azeez.jpg";
import deborahOlakoli from "@/assets/staff/deborah-olakoli.jpg";
import adaJonathan from "@/assets/staff/ada-jonathan.jpg";
import heroBg from "@/assets/hero-3.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const staff = [
  {
    name: "Mrs Bisola Toriola",
    role: "Proprietress",
    image: proprietressImg,
    description: "Visionary leader dedicated to providing quality education rooted in godliness and excellence.",
    featured: true,
  },
  {
<<<<<<< HEAD
    name: "Staff Member",
    role: "Head Teacher",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    description: "Experienced educator passionate about nurturing young minds.",
    featured: false,
  },
  {
    name: "Staff Member",
    role: "Class Teacher",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
    description: "Dedicated teacher committed to creating engaging learning experiences.",
    featured: false,
  },
  {
    name: "Staff Member",
    role: "Class Teacher",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
    description: "Enthusiastic educator with a love for creative teaching methods.",
    featured: false,
  },
  {
    name: "Staff Member",
    role: "Music Instructor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    description: "Talented musician helping students discover their musical potential.",
    featured: false,
  },
  {
    name: "Staff Member",
    role: "Administrative Staff",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    description: "Efficient administrator ensuring smooth school operations.",
=======
    name: "Mrs Kemi Obakpolor",
    role: "School Supervisor",
    image: kemiObakpolor,
    description: "Experienced supervisor ensuring smooth school operations and academic excellence.",
    featured: false,
  },
  {
    name: "Mrs Blessing Japhet",
    role: "Class Teacher",
    image: blessingJaphet,
    description: "Dedicated educator passionate about nurturing young minds.",
    featured: false,
  },
  {
    name: "Mrs Abiodun Olorunsuyi",
    role: "Class Teacher",
    image: abiodunOlorunsuyi,
    description: "Enthusiastic teacher committed to creating engaging learning experiences.",
    featured: false,
  },
  {
    name: "Mrs Doris Akalazu",
    role: "Class Teacher",
    image: dorisAkalazu,
    description: "Caring educator with a heart for child development and learning.",
    featured: false,
  },
  {
    name: "Mrs Juliana Iyedupe",
    role: "Class Teacher",
    image: julianaIyedupe,
    description: "Creative teacher fostering curiosity and love for learning in students.",
    featured: false,
  },
  {
    name: "Mrs Modupe Omezi",
    role: "Class Teacher",
    image: modupeOmezi,
    description: "Experienced educator dedicated to academic excellence and moral values.",
    featured: false,
  },
  {
    name: "Mrs Wunmi Azeez",
    role: "Class Teacher",
    image: wunmiAzeez,
    description: "Passionate teacher inspiring students to reach their full potential.",
    featured: false,
  },
  {
    name: "Mrs Deborah Olakoli",
    role: "Class Teacher",
    image: deborahOlakoli,
    description: "Dedicated educator committed to nurturing young minds with patience and care.",
    featured: false,
  },
  {
    name: "Mrs Ada Jonathan",
    role: "Class Teacher",
    image: adaJonathan,
    description: "Experienced teacher with a passion for early childhood education and development.",
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    featured: false,
  },
];

const Staff = () => {
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
            <span className="text-yellow font-medium text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h1 className="heading-display mt-4 mb-6">
              Meet Our <span className="text-yellow">Dedicated</span> Staff
            </h1>
            <p className="text-lg opacity-90">
              Our team of passionate educators and support staff work together 
              to provide the best learning experience for every child at 
              Christ The Haven School.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Staff - Proprietress */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl shadow-card-lg overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto">
                <img
                  src={staff[0].image}
                  alt={staff[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                    <Award size={16} />
                    Proprietress
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {staff[0].name}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {staff[0].description}
                </p>
                <p className="text-muted-foreground mb-6">
                  Under her visionary leadership, Christ The Haven School has grown 
                  into a nurturing educational institution that combines academic 
                  excellence with strong moral values. Her commitment to providing 
                  quality education has touched the lives of many young learners.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:info@christthehavenschool.com"
                    className="inline-flex items-center gap-2 text-secondary hover:underline"
                  >
                    <Mail size={18} />
                    Contact
                  </a>
                  <a 
                    href="tel:+2348023357800"
                    className="inline-flex items-center gap-2 text-secondary hover:underline"
                  >
                    <Phone size={18} />
                    +234 802 335 7800
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Staff */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Educators
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Teaching & Support <span className="text-primary">Staff</span>
            </h2>
          </motion.div>

<<<<<<< HEAD
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.slice(1).map((member, index) => (
              <motion.div
                key={member.name + index}
=======
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {staff.slice(1).map((member, index) => (
              <motion.div
                key={member.name}
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all group"
              >
<<<<<<< HEAD
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
=======
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium mb-3">
                    {member.role}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
<<<<<<< HEAD

          {/* Placeholder message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-8 italic"
          >
            * Staff photos and names will be updated with actual team members
          </motion.p>
        </div>
      </section>

=======
        </div>
      </section>

      <CTASection />
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
      <Footer />
    </main>
  );
};

export default Staff;
