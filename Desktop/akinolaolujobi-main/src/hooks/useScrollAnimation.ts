import { useEffect, useRef, useState, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

// Animation variants for different effects
export const animationVariants = {
  fadeUp: 'opacity-0 translate-y-8',
  fadeDown: 'opacity-0 -translate-y-8',
  fadeLeft: 'opacity-0 translate-x-8',
  fadeRight: 'opacity-0 -translate-x-8',
  fadeIn: 'opacity-0',
  scaleUp: 'opacity-0 scale-95',
  scaleDown: 'opacity-0 scale-105',
};

export const animatedClass = 'opacity-100 translate-x-0 translate-y-0 scale-100';

export function getAnimationClasses(isVisible: boolean, variant: keyof typeof animationVariants = 'fadeUp', delay = 0) {
  const baseClasses = 'transition-all duration-700 ease-out';
  const delayClass = delay > 0 ? `delay-[${delay}ms]` : '';
  
  return `${baseClasses} ${delayClass} ${isVisible ? animatedClass : animationVariants[variant]}`;
}
