import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import proprietressImg from "@/assets/proprietress.jpg";
<<<<<<< HEAD
=======
import kemiObakpolor from "@/assets/staff/kemi-obakpolor.jpg";
import blessingJaphet from "@/assets/staff/blessing-japhet.jpg";
import abiodunOlorunsuyi from "@/assets/staff/abiodun-olorunsuyi.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const teamMembers = [
  {
    name: "Mrs Bisola Toriola",
    role: "Proprietress",
    image: proprietressImg,
    featured: true,
  },
  {
<<<<<<< HEAD
    name: "Staff Member",
    role: "Head Teacher",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    featured: false,
  },
  {
    name: "Staff Member",
    role: "Class Teacher",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
    featured: false,
  },
  {
    name: "Staff Member",
    role: "Class Teacher",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
=======
    name: "Mrs Kemi Obakpolor",
    role: "School Supervisor",
    image: kemiObakpolor,
    featured: false,
  },
  {
    name: "Mrs Blessing Japhet",
    role: "Class Teacher",
    image: blessingJaphet,
    featured: false,
  },
  {
    name: "Mrs Abiodun Olorunsuyi",
    role: "Class Teacher",
    image: abiodunOlorunsuyi,
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
    featured: false,
  },
];

const TeamPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Meet Our <span className="text-primary">Dedicated</span> Staff
            </h2>
          </div>
          <Link to="/staff">
            <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Staff
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
<<<<<<< HEAD
              key={member.name + index}
=======
              key={member.name}
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all group ${
                member.featured ? "ring-2 ring-secondary" : ""
              }`}
            >
<<<<<<< HEAD
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
=======
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                />
                {member.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                      <Award size={12} />
                      Leader
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 text-center">
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-secondary font-medium">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
