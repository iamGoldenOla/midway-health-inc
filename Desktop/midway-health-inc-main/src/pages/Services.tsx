import useSEO from "@/hooks/useSEO";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import InspirationalMarquee from "@/components/shared/InspirationalMarquee";
import { motion } from "framer-motion";
import {
  ChevronDown, Phone, Heart,
  Hospital, Shield, Zap, Handshake, MapPin,
} from "lucide-react";
import heroImg from "@/assets/midway_4.jpg";
import midway1 from "@/assets/midway_1.jpg";
import midway2 from "@/assets/midway_2.jpg";
import midway3 from "@/assets/midway_3.jpg";
import midway4 from "@/assets/midway_5.jpg";
import midway5 from "@/assets/midway_6.jpg";
import ServicesBentoGrid from "@/components/services/ServicesBentoGrid";

const trustedPartners = [
  "American Red Cross",
  "Mayo Clinic",
  "Johns Hopkins",
  "Cleveland Clinic",
  "CDC",
  "WHO",
  "Blue Cross Blue Shield",
  "UnitedHealth",
  "Aetna",
  "Humana",
  "Kaiser Permanente",
  "Cigna",
];

const Services = () => {
  useSEO("Our Services | Midway Health Inc.", "Explore Midway Health's comprehensive home healthcare services including skilled nursing, physical therapy, personal care, companionship, and chronic disease management.");
  const { ref: trustedRef, isVisible: trustedVisible } = useScrollReveal();

  return (
    <Layout>
      <PageHero
        image={heroImg}
        title="Our Services"
        subtitle="Comprehensive home healthcare services delivered by experienced, caring professionals."
      />

      <ServicesBentoGrid />

      {/* Why Choose Midway Health — dark section */}
      <div className="bg-secondary text-secondary-foreground">

        {/* Why Choose Midway Health */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Text Content */}
              <div className="text-center lg:text-left">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-14">
                  Why Choose<br />Midway Health Inc<span className="hidden sm:inline">.</span><span className="sm:hidden">.</span>
                </h2>

                <div className="space-y-10">
                  {[
                    {
                      icon: Heart,
                      title: "Compassionate Care",
                      desc: "Our caregivers treat every patient like family, delivering personalized attention with warmth and empathy.",
                      color: "text-warm",
                    },
                    {
                      icon: Shield,
                      title: "Trusted Expertise",
                      desc: "Licensed professionals with years of experience, ensuring the highest standards of clinical excellence.",
                      color: "text-primary",
                    },
                    {
                      icon: Zap,
                      title: "Rapid Response",
                      desc: "Services can begin within 24–48 hours, because timely care makes all the difference in recovery.",
                      color: "text-warm",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex flex-col items-center lg:items-start">
                      <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4 ${item.color}`}>
                        <item.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-secondary-foreground/70 max-w-md leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Enhanced Cascading Polaroid Fan (diagonal bottom-left to top-right) */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[580px] lg:h-[680px] px-2 sm:px-4 md:px-8 lg:px-12">
                {/* Mobile: Compact Grid */}
                <div className="md:hidden grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  {[
                    { img: midway1, rotate: -2 },
                    { img: midway2, rotate: 2 },
                    { img: midway3, rotate: -1 },
                    { img: midway4, rotate: 1 },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="bg-white rounded-xl p-2 shadow-[0_4px_20px_rgb(0,0,0,0.12)] transition-shadow duration-300">
                        <img
                          src={card.img}
                          alt="Midway Health care"
                          className="w-full h-32 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="py-2 px-1">
                          <div className="h-1.5 w-10 bg-gray-300 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop/Tablet: Cascading Fan Layout */}
                <div className="hidden md:block relative h-full">
                  {[
                    {
                      img: midway3,
                      rotate: -12,
                      bottom: 30,
                      right: 280,
                      z: 50,
                      size: "w-56 lg:w-64",
                      delay: 0
                    },
                    {
                      img: midway2,
                      rotate: -4,
                      bottom: 130,
                      right: 180,
                      z: 40,
                      size: "w-52 lg:w-60",
                      delay: 0.1
                    },
                    {
                      img: midway1,
                      rotate: 4,
                      bottom: 240,
                      right: 80,
                      z: 30,
                      size: "w-48 lg:w-56",
                      delay: 0.2
                    },
                    {
                      img: midway4,
                      rotate: 12,
                      bottom: 350,
                      right: -20,
                      z: 20,
                      size: "w-44 lg:w-52",
                      delay: 0.3
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${card.size} cursor-pointer`}
                      initial={{
                        opacity: 0,
                        y: 50,
                        rotate: card.rotate + 10,
                        scale: 0.8
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        rotate: card.rotate,
                        scale: 1
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: card.delay,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 0,
                        y: -12,
                        zIndex: 100,
                        transition: {
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300
                        }
                      }}
                      style={{
                        bottom: `${card.bottom}px`,
                        right: `${card.right}px`,
                        zIndex: card.z,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Polaroid Card with Enhanced Styling */}
                      <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-shadow duration-300">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={card.img}
                            alt="Midway Health care"
                            className="w-full h-36 lg:h-44 object-cover"
                            loading="lazy"
                          />
                          {/* Subtle overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>
                        {/* Polaroid caption area */}
                        <div className="py-3 px-2">
                          <div className="h-2 w-14 lg:w-16 bg-gray-300 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <InspirationalMarquee />

      {/* Process / How It Works */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-warm text-sm font-semibold tracking-wider uppercase">How It Works</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
              Getting Started Is Simple
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Contact Us", desc: "Reach out by phone or through our website to discuss your care needs." },
              { step: "02", title: "Assessment", desc: "Our clinical team conducts a thorough in-home assessment." },
              { step: "03", title: "Care Plan", desc: "We create a personalized care plan tailored to your specific needs." },
              { step: "04", title: "Begin Care", desc: "Your dedicated care team begins delivering services at home." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-warm text-warm-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-display shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Left - Heading */}
            <div className="lg:sticky lg:top-32">
              <span className="text-warm text-sm font-semibold tracking-wider uppercase">FAQ</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Have questions about our home healthcare services? Find answers to the most common inquiries below.
              </p>
              <div className="hidden lg:flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-warm" />
                <span>Still have questions? Call <a href="tel:+13122989124" className="text-primary font-semibold hover:underline">(312) 298-9124</a></span>
              </div>
            </div>

            {/* Right - Accordion Cards */}
            <div className="space-y-4">
              {([
                { q: "How do I know if I qualify for home health services?", a: "Generally, you qualify if you are homebound and need skilled care. Our team will help determine your eligibility during the initial assessment.", Icon: Hospital },
                { q: "Does insurance cover home healthcare?", a: "Most services are covered by Medicare, Medicaid, and private insurance. We verify your coverage before starting services.", Icon: Shield },
                { q: "How quickly can services begin?", a: "In most cases, we can begin services within 24–48 hours of receiving a referral and completing the initial assessment.", Icon: Zap },
                { q: "Can I choose my caregiver?", a: "We do our best to match you with caregivers who fit your needs and preferences. You can always request a change if needed.", Icon: Handshake },
                { q: "What areas do you serve?", a: "We serve the greater Chicago metropolitan area. Contact us to confirm we cover your specific location.", Icon: MapPin },
              ] as const).map((faq, i) => (
                <details key={faq.q} className="group rounded-2xl border border-border bg-card shadow-card overflow-hidden transition-all hover:shadow-elevated">
                  <summary className="cursor-pointer px-6 py-5 flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-warm/10 flex items-center justify-center text-lg shrink-0 group-open:bg-warm group-open:text-warm-foreground transition-colors">
                      <faq.Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display font-semibold text-foreground flex-1 text-left">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 pl-6 sm:pl-20">
                    <div className="h-px bg-border mb-4" />
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-muted overflow-hidden" ref={trustedRef}>
        <div className={`text-center mb-10 ${trustedVisible ? "animate-fade-in" : "opacity-0"}`}>
          <span className="text-warm text-sm font-semibold tracking-wider uppercase">Trusted By</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
            Our Partners & Affiliations
          </h2>
        </div>
        <div className="relative">
          <div className="flex gap-16 animate-[marqueeScroll_30s_linear_infinite]">
            {[...trustedPartners, ...trustedPartners].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-card rounded-xl border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-full bg-warm/10 flex items-center justify-center">
                  <span className="text-warm font-bold text-lg">{name.charAt(0)}</span>
                </div>
                <span className="font-semibold text-foreground text-sm whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>
    </Layout>
  );
};

export default Services;
