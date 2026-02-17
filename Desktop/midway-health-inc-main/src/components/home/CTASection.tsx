import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`gradient-hero rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center relative overflow-hidden ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-warm/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-warm/10 blur-2xl" />

          <div className="relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4 sm:mb-6">
              Ready to Experience<br />Exceptional Home Care?
            </h2>
            <p className="text-secondary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Contact us today to schedule a free consultation and learn how we can support your healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-warm text-warm-foreground border-0 rounded-xl px-8 hover:bg-warm/90 transition-colors text-base font-semibold">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+13122989124" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-xl px-8 bg-warm text-warm-foreground hover:bg-warm/90 text-base font-semibold shadow-lg">
                  <Phone className="mr-2 h-5 w-5" /> (312) 298-9124
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
