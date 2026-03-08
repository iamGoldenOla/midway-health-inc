import { useState, useEffect } from 'react';
import ParallaxSection from '@/components/shared/ParallaxSection';

const quotes = [
  { text: "Excellence is not a destination — it's a standard we uphold in every service, every interaction, every detail.", author: "Akinola Olujobi" },
  { text: "Your story is your greatest asset. Tell it with courage, clarity, and conviction.", author: "Akinola Olujobi" },
  { text: "The difference between ordinary and extraordinary is the little 'extra' you bring to the table.", author: "Akinola Olujobi" },
  { text: "Don't settle for ordinary. Akinola Olujobi exists to raise the bar — in service, in quality, in every single detail.", author: "Akinola Olujobi" },
  { text: "Success isn't just about what you accomplish — it's about what you inspire others to do.", author: "Akinola Olujobi" },
  { text: "In a world full of noise, clarity is the ultimate superpower.", author: "Akinola Olujobi" },
  { text: "Don't just build a brand — build a legacy that speaks when you're not in the room.", author: "Akinola Olujobi" },
];

export default function ScrollingQuotesSection() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80"
      overlayOpacity="bg-navy/80"
      contentClassName="relative z-10 w-full px-0 py-14 text-center"
    >
      <div className="relative min-h-[190px] md:min-h-[240px] flex items-center justify-center w-full max-w-[1440px] mx-auto">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 transition-all duration-700 ${
              index === currentQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <span className="inline-block w-12 h-0.5 bg-coral mb-6" />
            <blockquote className="block w-full max-w-[1220px] mx-auto text-lg sm:text-2xl md:text-4xl font-hero italic text-primary-foreground leading-tight md:leading-[1.25] text-center whitespace-normal [word-break:normal] [overflow-wrap:normal]">
              "{quote.text}"
            </blockquote>
            <p className="text-coral font-semibold mt-5 text-sm md:text-base whitespace-nowrap">— {quote.author}</p>
          </div>
        ))}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuote(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentQuote ? 'w-6 bg-coral' : 'w-2 bg-primary-foreground/30'
              }`}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
