import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterProps {
  words: string[];
  prefix?: string;
  suffix?: string;
  className?: string;
  cursorClassName?: string;
  textClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export default function Typewriter({
  words,
  prefix = '',
  suffix = '',
  className = '',
  cursorClassName = '',
  textClassName = 'text-primary',
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
}: TypewriterProps) {
  const { text } = useTypewriter({
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
  });

  return (
    <span className={className}>
      {prefix}
      <span className={textClassName}>{text}</span>
      <span className={`animate-blink ${cursorClassName}`}>|</span>
      {suffix}
    </span>
  );
}
