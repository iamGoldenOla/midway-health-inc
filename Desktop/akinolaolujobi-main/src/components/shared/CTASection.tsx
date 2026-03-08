import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Typewriter from './Typewriter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedSection from './AnimatedSection';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: 'primary' | 'gradient';
  showTypewriter?: boolean;
}

export default function CTASection({
  title = "Ready to Elevate Your Brand?",
  subtitle = "Let's create something extraordinary together. Whether you need compelling content, digital strategy, or creative storytelling — Akinola Olujobi is here.",
  buttonText = "Let's Talk",
  buttonLink = "/contact",
  variant = 'gradient',
  showTypewriter = false,
}: CTASectionProps) {
  const typewriterWords = ['Talk', 'Collaborate', 'Build Something Great'];
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${variant === 'gradient' ? 'bg-gradient-to-br from-primary via-primary to-navy' : 'bg-primary'}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container-custom px-4 md:px-8 relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <AnimatedSection>
            <span className="inline-block w-12 h-0.5 bg-coral mb-8" />
          </AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            {title}
          </h2>

          {showTypewriter ? (
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10">
              <Typewriter
                words={typewriterWords}
                prefix="Let's "
                className="font-medium"
                textClassName="text-coral font-bold"
                typeSpeed={80}
                deleteSpeed={40}
              />
            </p>
          ) : (
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          <Link to={buttonLink}>
            <Button
              size="lg"
              className="bg-coral text-foreground hover:bg-coral-dark px-10 py-6 text-lg group shadow-lg shadow-coral/20"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
