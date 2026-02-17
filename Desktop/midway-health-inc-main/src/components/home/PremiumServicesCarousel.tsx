import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Stethoscope, Users, Activity, Home, Scissors, CheckCircle, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

// Show only top 6 services on home page for conciseness
const services = [
  {
    title: "Skilled Nursing",
    desc: "Expert nursing care delivered at home — from wound management to IV therapy and health monitoring.",
    slug: "skilled-nursing",
    icon: Stethoscope,
    benefits: ["24/7 Care Available", "Licensed Professionals", "Advanced Medical Support"]
  },
  {
    title: "Personal Care",
    desc: "Compassionate support with bathing, grooming, and daily routines to maintain your dignity.",
    slug: "personal-care",
    icon: Heart,
    benefits: ["Dignified Assistance", "Personalized Routines", "Compassionate Caregivers"]
  },
  {
    title: "Physical Therapy",
    desc: "Personalized rehabilitation programs to restore your strength, mobility, and confidence.",
    slug: "physical-therapy",
    icon: Activity,
    benefits: ["Customized Programs", "Mobility Restoration", "Expert Therapists"]
  },
  {
    title: "Home Health Aide",
    desc: "Dedicated aides providing hands-on assistance with daily living and household support.",
    slug: "home-health-aide",
    icon: Home,
    benefits: ["Daily Living Support", "Household Assistance", "Reliable Care"]
  },
  {
    title: "Companionship Care",
    desc: "Warm companionship that combats isolation through meaningful social connection.",
    slug: "companionship-care",
    icon: Users,
    benefits: ["Social Engagement", "Emotional Support", "Meaningful Connection"]
  },
  {
    title: "Post-Surgical Care",
    desc: "Comprehensive recovery support including wound care, pain management, and rehabilitation.",
    slug: "post-surgical-care",
    icon: Scissors,
    benefits: ["Recovery Monitoring", "Pain Management", "Wound Care Expertise"]
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group h-full"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-[340px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 bg-white rounded-2xl p-5 shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)"
            }}
          >
            {/* Front Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className="mb-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title with accent line */}
              <div className="mb-2">
                <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wide mb-2 leading-tight">
                  {service.title}
                </h3>
                <div className="h-0.5 w-12 bg-warm" />
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-1">
                {service.desc}
              </p>

              {/* Click to flip hint */}
              <div className="text-xs text-muted-foreground/60 italic mb-3">
                Click to see benefits →
              </div>

              {/* CTA Button */}
              <Link to={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()}>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2.5 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                >
                  <span>Explore service</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            {/* Back Content */}
            <div className="relative z-10 h-full flex flex-col text-white">
              {/* Icon */}
              <div className="mb-3">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold mb-2 leading-tight">
                {service.title}
              </h3>
              <div className="h-0.5 w-12 bg-warm mb-4" />

              {/* Benefits List */}
              <div className="flex-1 mb-3">
                <p className="text-sm font-semibold mb-2 text-white/90">Key Benefits:</p>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-warm shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Click to flip back hint */}
              <div className="text-xs text-white/70 italic mb-3">
                Click to flip back
              </div>

              {/* CTA Button */}
              <Link to={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline"
                  className="w-full bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary rounded-lg px-6 py-2.5 font-semibold text-sm transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PremiumServicesCarousel = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        {/* Two-Column Layout: Left Heading + Right Cards */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE - Section Header (aligned with middle row) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:mt-[170px]"
          >
            {/* Main Heading */}
            <div className="mb-4">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Our Services</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Care Tailored to You
              </h2>
            </div>

            {/* Orange accent line */}
            <div className="h-1 w-16 bg-warm mb-6" />

            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              We are here for you at every step of your health care journey, from primary care to specialty care.
            </p>

            {/* View All Link */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-300 group"
            >
              <span>View all medical services</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* RIGHT SIDE - Services Grid (2 columns) */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumServicesCarousel;
