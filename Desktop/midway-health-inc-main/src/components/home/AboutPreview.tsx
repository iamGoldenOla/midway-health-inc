import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Counter from "@/components/shared/Counter";
import aboutImg from "@/assets/midway_8.jpg";

const highlights = [
  "Licensed & certified healthcare professionals",
  "Personalized care plans for every patient",
  "24/7 availability for emergency support",
  "Trusted by families across the community",
];

const AboutPreview = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 lg:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={aboutImg}
                alt="Healthcare team"
                className="w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-card rounded-2xl p-4 sm:p-6 shadow-elevated border border-border max-w-[180px] sm:max-w-[220px]">
              <div className="text-2xl sm:text-3xl font-bold text-primary font-display">
                <Counter value={5} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Years of trusted healthcare service</div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">About Us</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mt-3 mb-6 leading-[1.1]">
              Dedicated to Your Health & Well-Being
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Midway Health Inc., we believe everyone deserves access to quality healthcare in the comfort of their own home. Our team of licensed professionals is committed to providing compassionate, personalized care that empowers patients and supports families.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>

            <Link to="/about" className="block sm:inline-block">
              <Button className="w-full sm:w-auto gradient-primary text-primary-foreground border-0 rounded-xl px-8 shadow-soft hover:opacity-90 transition-opacity">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
