import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventCarouselProps {
  images: { src: string; alt: string }[];
  onImageClick: (src: string) => void;
}

const EventCarousel = ({ images, onImageClick }: EventCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const getVisibleImages = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      result.push({ ...images[index], position: i });
    }
    return result;
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Carousel */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
        <div className="flex items-center justify-center h-full gap-4 px-12">
          {getVisibleImages().map((image, idx) => (
            <motion.div
              key={`${image.src}-${idx}`}
              className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
                image.position === 0
                  ? "w-[60%] h-full z-20"
                  : "w-[25%] h-[75%] z-10 opacity-60"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: image.position === 0 ? 1 : 0.6, scale: 1 }}
              onClick={() => image.position === 0 && onImageClick(image.src)}
              whileHover={image.position === 0 ? { scale: 1.02 } : {}}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.position === 0 && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
                  <p className="text-primary-foreground font-medium text-lg">
                    {image.alt}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg hover:bg-background transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg hover:bg-background transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-secondary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "ring-2 ring-secondary ring-offset-2 ring-offset-background"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
