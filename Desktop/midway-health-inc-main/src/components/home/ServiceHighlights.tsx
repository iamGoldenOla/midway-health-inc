import { Link } from "react-router-dom";
import { Heart, Activity, Users, Pill, Stethoscope, Brain } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  { icon: Stethoscope, name: "Skilled Nursing", desc: "Licensed nurses providing expert medical care in the comfort of your home.", slug: "skilled-nursing" },
  { icon: Heart, name: "Personal Care", desc: "Assistance with daily activities to maintain dignity and independence.", slug: "personal-care" },
  { icon: Activity, name: "Physical Therapy", desc: "Restore mobility and strength with customized rehabilitation programs.", slug: "physical-therapy" },
  { icon: Users, name: "Companionship Care", desc: "Meaningful social engagement and emotional support for your loved ones.", slug: "companionship-care" },
  { icon: Pill, name: "Medication Management", desc: "Safe and accurate medication administration and monitoring.", slug: "medication-management" },
  { icon: Brain, name: "Chronic Disease Management", desc: "Comprehensive care plans for ongoing health conditions.", slug: "chronic-disease-management" },
];

const ServiceHighlights = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-warm text-sm font-semibold tracking-wider uppercase">What We Offer</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Our Healthcare Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We provide a comprehensive range of home healthcare services designed to meet your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" style={{ perspective: "1200px" }}>
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className={`group relative bg-card rounded-2xl p-8 border border-border transition-all duration-500 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${i * 100}ms`,
                transformStyle: "preserve-3d",
                transform: "translateZ(0)",
                boxShadow: "0 8px 32px -6px hsl(0 0% 0% / 0.1), 0 4px 8px -2px hsl(0 0% 0% / 0.06), 0 -1px 0 0 hsl(0 0% 100% / 0.5) inset, 0 1px 0 0 hsl(0 0% 0% / 0.04) inset",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px) rotateX(4deg) rotateY(-2deg) translateZ(20px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px -10px hsl(24 95% 53% / 0.2), 0 10px 20px -5px hsl(0 0% 0% / 0.1), 0 -1px 0 0 hsl(0 0% 100% / 0.6) inset, 0 1px 0 0 hsl(0 0% 0% / 0.04) inset";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateZ(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px -6px hsl(0 0% 0% / 0.1), 0 4px 8px -2px hsl(0 0% 0% / 0.06), 0 -1px 0 0 hsl(0 0% 100% / 0.5) inset, 0 1px 0 0 hsl(0 0% 0% / 0.04) inset";
              }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-warm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 3D icon with shadow layer */}
              <div className="relative w-16 h-16 mb-6" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 rounded-2xl bg-warm/15 translate-x-1.5 translate-y-1.5 blur-[1px]" />
                <div className="absolute inset-0 rounded-2xl bg-warm/10 translate-x-0.5 translate-y-0.5" />
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, hsl(174, 100%, 32%), hsl(174, 80%, 26%))",
                    boxShadow: "0 6px 20px -4px hsl(174 100% 29% / 0.4), inset 0 1px 0 hsl(174 100% 50% / 0.3), inset 0 -1px 0 hsl(174 100% 20% / 0.3)",
                  }}
                >
                  <s.icon className="h-8 w-8 text-primary-foreground" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-warm transition-colors">{s.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>

              <div className="flex items-center gap-2 text-warm font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                Learn more
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex items-center gap-2 text-warm font-semibold hover:text-primary transition-colors">
            View all services
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
