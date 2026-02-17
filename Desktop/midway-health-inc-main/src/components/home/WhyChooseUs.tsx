import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Heart, Clock, Award, Users, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const reasons = [
  {
    icon: Shield,
    title: "Certified Experts",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&h=300&fit=crop&crop=face",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
  },
  {
    icon: Award,
    title: "Trusted Care",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    icon: Users,
    title: "Family Focused",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
  },
  {
    icon: Stethoscope,
    title: "Clinical Excellence",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
  },
];

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reasons.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isVisible]);

  // Center of the container (50%, 50%), orbit radius ~38% of container
  // Place 6 circles evenly around the center, starting from top
  const orbitRadius = 34; // percentage
  const centerX = 50;
  const centerY = 50;
  // Sizes alternate for visual variety
  const sizes = [
    "w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px]",
    "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[145px] md:h-[145px]",
    "w-[85px] h-[85px] sm:w-[105px] sm:h-[105px] md:w-[125px] md:h-[125px]",
    "w-[95px] h-[95px] sm:w-[115px] sm:h-[115px] md:w-[135px] md:h-[135px]",
    "w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]",
    "w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px]",
  ];

  const getPosition = (index: number) => {
    // Start from -90deg (top) and go clockwise
    const angle = (-90 + index * 60) * (Math.PI / 180);
    const x = centerX + orbitRadius * Math.cos(angle);
    const y = centerY + orbitRadius * Math.sin(angle);
    return { x, y };
  };

  return (
    <section className="py-20 lg:py-28 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center">
          {/* Left - text content */}
          <motion.div
            className="order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6">
              <span className="text-base">✦</span> Why Choose Us
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
              A Better Path{" "}
              <span className="text-gradient">to Quality</span>{" "}
              Care.
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              We've combined experienced caregivers with personalized care plans
              to create Chicago's most trusted home healthcare service — delivering
              compassion, expertise, and dignity to every family.
            </p>

            <div className="flex flex-wrap gap-8 sm:gap-12">
              {[
                { value: "500+", label: "Families Served" },
                { value: "24/7", label: "Available Care" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <p className="font-display text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Tight orbit cluster - appears AFTER text on mobile */}
          <div className="order-2 relative flex items-center justify-center lg:-ml-8">
            <motion.div
              className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[440px] lg:h-[440px] mx-auto"
              animate={{
                y: [0, -14, 0, -7, 0],
                rotateX: [0, 2, 0, -1, 0],
                rotateZ: [0, 1.5, 0, -0.8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ perspective: 800 }}
            >
              {/* Orbit ring */}
              <div
                className="absolute rounded-full border border-dashed border-primary/15"
                style={{
                  top: `${centerY - orbitRadius}%`,
                  left: `${centerX - orbitRadius}%`,
                  width: `${orbitRadius * 2}%`,
                  height: `${orbitRadius * 2}%`,
                }}
              />

              {/* Center brand circle */}
              <motion.div
                className="absolute z-20 rounded-full gradient-primary flex items-center justify-center shadow-2xl
                  w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[115px] md:h-[115px]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15, duration: 0.6, ease: "backOut" }}
              >
                <div className="text-center">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary-foreground mx-auto mb-0.5" fill="currentColor" />
                  <p className="text-primary-foreground text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wide leading-tight">MIDWAY</p>
                  <p className="text-primary-foreground/80 text-[7px] sm:text-[8px] md:text-[10px] leading-tight">HEALTH Inc.</p>
                </div>
              </motion.div>

              {/* Orbiting photo circles */}
              {reasons.map((reason, i) => {
                const { x, y } = getPosition(i);
                const Icon = reason.icon;
                const isActive = activeIndex === i;

                return (
                  <motion.div
                    key={reason.title}
                    className={`absolute ${sizes[i]} z-10`}
                    style={{
                      top: `${y}%`,
                      left: `${x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.55,
                      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full border-[2.5px] p-[3px] transition-all duration-500 ${
                        isActive
                          ? "border-primary shadow-[0_0_24px_hsl(174_100%_29%/0.3)]"
                          : "border-white/60 shadow-elevated"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <img
                          src={reason.image}
                          alt={reason.title}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isActive ? "scale-110" : "scale-100"
                          }`}
                          loading="lazy"
                        />
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35 }}
                            >
                              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white mb-1" strokeWidth={2} />
                              <p className="text-white text-[8px] sm:text-[10px] md:text-xs font-bold text-center px-1 leading-tight">
                                {reason.title}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Small icon badge */}
                    <motion.div
                      className={`absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md border-2 border-background z-10 transition-colors duration-300 ${
                        isActive ? "bg-primary" : "bg-warm"
                      }`}
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: "backOut" }}
                    >
                      <Icon className="h-3 w-3 text-white" strokeWidth={2.5} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
