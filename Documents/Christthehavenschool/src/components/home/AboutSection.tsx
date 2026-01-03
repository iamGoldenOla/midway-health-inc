import { motion } from "framer-motion";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "10+", label: "Years of Excellence" },
  { icon: Users, value: "100+", label: "Students Enrolled" },
  { icon: Award, value: "98%", label: "Success Rate" },
  { icon: BookOpen, value: "15+", label: "Qualified Teachers" },
];

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              About Our School
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-6">
              Shaping <span className="text-secondary">Tomorrow's Leaders</span> Today
            </h2>
            <p className="text-body mb-6">
              Christ The Haven School is a premier Nursery and Primary educational institution 
              located in Ogun State, Nigeria. We are committed to providing quality education 
              in a nurturing environment rooted in strong moral values and godliness.
            </p>
            <p className="text-body mb-4">
              <span className="font-semibold text-primary">School Motto: Excellence & Godliness</span>
            </p>
            <p className="text-body mb-8">
              Our holistic approach to education combines rigorous academic programs with 
              character development, ensuring our students are prepared for the challenges 
              of tomorrow while maintaining strong ethical values.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {["Academic Excellence", "Character Building", "Innovation", "Godliness"].map((value) => (
                <div key={value} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-shadow border-l-4 border-secondary"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <stat.icon className="text-secondary" size={28} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;