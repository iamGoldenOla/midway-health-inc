import { ReactNode } from 'react';
import { useScrollAnimation, animationVariants, animatedClass } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: keyof typeof animationVariants;
  delay?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold });

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? animatedClass : animationVariants[animation]
      } ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
}
