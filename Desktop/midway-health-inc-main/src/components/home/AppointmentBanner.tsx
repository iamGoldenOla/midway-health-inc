import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import parallaxImg from "@/assets/midway_4.jpg";

const AppointmentBanner = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative h-[350px] parallax-bg overflow-hidden"
      style={{ backgroundImage: `url(${parallaxImg})` }}
    >
      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className={`relative z-10 container mx-auto px-4 h-full flex items-center ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 w-full">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-warm" />
              <span className="text-warm font-semibold text-sm tracking-wider uppercase">Book Now</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              Quality Healthcare<br className="hidden md:block" /> Starts Here
            </h2>
            <p className="text-white/80 mt-3 text-lg max-w-lg">
              Schedule your appointment today and experience compassionate care in the comfort of your home.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Link to="/appointment" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-warm text-warm-foreground border-0 rounded-xl px-10 shadow-lg hover:opacity-90 transition-opacity text-base font-semibold"
              >
                BOOK APPOINTMENT <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+13122989124" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 bg-warm text-warm-foreground border-0 hover:opacity-90 transition-opacity text-base font-semibold shadow-lg"
              >
                <Phone className="mr-2 h-5 w-5" /> Call Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBanner;
