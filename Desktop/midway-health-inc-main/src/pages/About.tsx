import useSEO from "@/hooks/useSEO";
import { useState, useEffect } from "react";
import Testimonials from "@/components/home/Testimonials";
import TeamMembers from "@/components/home/TeamMembers";
import Layout from "@/components/layout/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Eye, Target, Shield, Award, Users, Calendar, Clock, MapPin, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InspirationalMarquee from "@/components/shared/InspirationalMarquee";
import { motion } from "framer-motion";
import heroImg from "@/assets/midway_12.jpg";
import parallaxImg from "@/assets/midway_3.jpg";
import storyImg from "@/assets/midway_2.jpg";
import teamImg from "@/assets/midway_5.jpg";
import Counter from "@/components/shared/Counter";

const values = [
  { icon: Heart, title: "Compassion", desc: "We treat every patient with empathy, kindness, and genuine care." },
  { icon: Shield, title: "Integrity", desc: "We uphold the highest ethical standards in everything we do." },
  { icon: Award, title: "Excellence", desc: "We strive for the highest quality in healthcare delivery." },
  { icon: Users, title: "Collaboration", desc: "We work as a team with families and physicians for optimal outcomes." },
];

const milestones = [
  { year: "2009", title: "Founded", desc: "Midway Health Inc. established in Chicago with a small nursing team." },
  { year: "2013", title: "100 Patients Served", desc: "Reached our first major milestone in patient care." },
  { year: "2017", title: "Expanded Services", desc: "Added physical therapy, occupational therapy, and speech therapy programs." },
  { year: "2021", title: "Community Award", desc: "Recognized for outstanding community healthcare service." },
  { year: "2026", title: "150K+ Patients", desc: "Serving thousands of families with 200+ care professionals." },
];

const EVENT_DATE = new Date("2026-04-18T09:00:00");

const About = () => {
  useSEO("About Us | Midway Health Inc.", "Learn about Midway Health Inc., our mission, values, and dedicated team providing compassionate home healthcare services in Chicago since 2010.");
  const storySection = useScrollReveal();
  const valuesSection = useScrollReveal();
  const timelineSection = useScrollReveal();

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = EVENT_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Layout>
      {/* JAXOPAY-style split hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] bg-background overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[85vh] md:min-h-[90vh]">
            {/* Left: Text content */}
            <motion.div
              className="pt-20 lg:pt-0 lg:pr-16"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted mb-8">
                <Star className="h-4 w-4 text-warm" fill="currentColor" />
                <span className="text-sm font-semibold text-foreground">About Midway Health</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold text-foreground leading-[1.08] mb-6">
                Bringing Quality{" "}
                <span className="text-primary">Healthcare</span>{" "}
                to Your Home
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                Midway Health Inc. is dedicated to providing compassionate, personalized home healthcare services — empowering patients and supporting families across the community.
              </p>

              <div className="flex flex-wrap gap-8 sm:gap-12">
                {[
                  { value: 150, label: "Patients Served", suffix: "K+" },
                  { value: 5, label: "Years Experience", suffix: "+" },
                  { value: 98, label: "Satisfaction Rate", suffix: "%" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image with floating badge */}
            <motion.div
              className="relative pb-10 lg:pb-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroImg}
                  alt="Midway Health team providing care"
                  className="w-full h-[350px] sm:h-[450px] lg:h-[560px] object-cover"
                />
              </div>

              {/* Floating award badge */}
              <motion.div
                className="absolute bottom-4 lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[320px] bg-card/95 backdrop-blur-md rounded-2xl p-5 shadow-elevated border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">Trusted Healthcare Provider</div>
                    <div className="text-sm text-muted-foreground">Serving Chicago Communities Since 2009</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28" ref={storySection.ref}>
        <div className={`container mx-auto px-4 ${storySection.isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-warm text-sm font-semibold tracking-wider uppercase">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                A Legacy of Compassionate Care
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Midway Health Inc. was founded with a simple yet powerful belief: that every individual deserves access to exceptional healthcare without leaving the comfort of their home. What started as a small team of dedicated nurses has grown into a comprehensive home healthcare provider serving communities with distinction.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Today, our team of licensed healthcare professionals continues to uphold the founding principles of compassion, integrity, and excellence. We take pride in building lasting relationships with our patients and their families, ensuring continuity of care that makes a real difference.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Care Professionals", value: 10, suffix: "+" },
                  { label: "Years Experience", value: 5, suffix: "+" },
                  { label: "Patient Satisfaction", value: 98, suffix: "%" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted rounded-xl px-5 py-3 border border-border">
                    <div className="font-display text-xl font-bold text-warm">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={storyImg}
                alt="Healthcare team meeting"
                className="w-full h-[250px] sm:h-[320px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Parallax */}
      <section
        className="h-[300px] parallax-bg relative"
        style={{ backgroundImage: `url(${parallaxImg})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center gap-6 sm:gap-10 md:gap-16 flex-wrap px-4">
              {[
                { value: 5, label: "Years Experience", suffix: "+" },
                { value: 150, label: "Patients Served", suffix: "K+" },
                { value: 10, label: "Care Professionals", suffix: "+" },
                { value: 98, label: "Satisfaction Rate", suffix: "%" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-warm">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/70 text-xs sm:text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-warm flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-warm-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted and innovative home healthcare provider, setting the standard for quality, compassion, and patient-centered care in every community we serve.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-warm flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-warm-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver personalized, high-quality healthcare services in the comfort of home, empowering patients to achieve their best health outcomes while maintaining dignity and independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28" ref={valuesSection.ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-warm text-sm font-semibold tracking-wider uppercase">What Guides Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`text-center p-6 rounded-2xl bg-card shadow-card border border-border hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${valuesSection.isVisible ? "animate-fade-in" : "opacity-0"
                  }`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-warm flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-warm-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InspirationalMarquee />

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-muted relative overflow-hidden" ref={timelineSection.ref}>
        <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-warm/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Our Journey</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
              Milestones That Define Us
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              From humble beginnings to serving thousands — every step has been guided by compassion.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="hidden md:block relative">
              <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="grid grid-cols-5 gap-6">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className={`flex flex-col items-center ${timelineSection.isVisible ? "animate-fade-in" : "opacity-0"
                      }`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="relative z-10 w-[104px] h-[104px] rounded-full gradient-primary flex items-center justify-center shadow-lg mb-6 ring-4 ring-muted">
                      <span className="text-primary-foreground font-bold text-xl font-display block">{m.year}</span>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 text-center w-full group">
                      <div className="w-1 h-6 gradient-primary rounded-full mx-auto -mt-8 mb-3" />
                      <h4 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{m.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden space-y-6">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-start gap-4 ${timelineSection.isVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="relative z-10 w-16 h-16 rounded-full gradient-primary flex items-center justify-center shrink-0 shadow-lg ring-4 ring-muted">
                    <span className="text-primary-foreground font-bold text-sm font-display">{m.year}</span>
                  </div>
                  <div className="bg-card rounded-2xl border border-border p-5 shadow-card flex-1 hover:shadow-elevated transition-shadow duration-300">
                    <h4 className="font-display text-lg font-bold text-foreground mb-1">{m.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={teamImg} alt="Our healthcare team" className="w-full h-[250px] sm:h-[320px] md:h-[400px] object-cover" />
            </div>
            <div>
              <span className="text-warm text-sm font-semibold tracking-wider uppercase">Our Approach</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Patient-Centered Care
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every care plan we create is tailored to the individual needs, preferences, and goals of our patients. We believe that the best outcomes come from listening, understanding, and collaborating.
              </p>
              <div className="space-y-3">
                {["Personalized care plans for every patient", "24/7 on-call nursing support", "Regular family communication & updates", "Evidence-based treatment protocols", "Continuous quality improvement"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-warm shrink-0" />
                    <span className="text-foreground text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamMembers />

      <Testimonials />

      {/* Upcoming Event with Countdown */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <span className="text-warm text-sm font-semibold tracking-wider uppercase">Upcoming Event</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            Annual Community Health Fair
          </h2>
          <p className="text-white/70 text-lg mb-3">Free health screenings, wellness seminars, and family activities.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white/60 text-sm mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-warm" />
              <span>April 18, 2026</span>
            </span>
            <span className="hidden sm:inline mx-1">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-warm" />
              <span>9:00 AM – 3:00 PM</span>
            </span>
            <span className="hidden sm:inline mx-1">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-warm" />
              <span>Chicago Community Center</span>
            </span>
          </div>

          <div className="flex justify-center gap-4 md:gap-6 mb-10">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="w-16 sm:w-20 md:w-24 rounded-2xl py-3 sm:py-4"
                style={{
                  background: "linear-gradient(135deg, hsl(24, 95%, 53%), hsl(32, 98%, 56%))",
                  boxShadow: "0 8px 24px -4px hsl(24 95% 53% / 0.4)",
                }}
              >
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-white/80 text-xs mt-1 uppercase tracking-wider">{unit.label}</div>
              </div>
            ))}
          </div>

          <Link to="/contact">
            <Button size="lg" className="bg-warm text-warm-foreground border-0 rounded-xl px-10 shadow-lg hover:opacity-90 transition-opacity font-semibold text-base">
              Register Interest <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
