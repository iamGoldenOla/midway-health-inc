import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, Heart, Mic } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YOUTUBE_THUMBNAIL = "https://img.youtube.com/vi/LpSDuDIaBGk/maxresdefault.jpg";

const HealthTalkVideo = () => {
  const { ref, isVisible } = useScrollReveal();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-elevated ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="video"
                className="aspect-video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <iframe
                  src="https://www.youtube.com/embed/LpSDuDIaBGk?autoplay=1"
                  title="Health Talk - Midway Health Inc."
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </motion.div>
            ) : (
              <motion.div
                key="thumbnail"
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Full-width thumbnail — NO overlay, NO opacity */}
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={YOUTUBE_THUMBNAIL}
                    alt="Health Talk with healthcare professional"
                    className="w-full aspect-video object-cover object-center"
                  />

                  {/* Play button centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-warm/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Play
                        className="h-7 w-7 sm:h-8 sm:w-8 text-warm-foreground ml-0.5"
                        fill="currentColor"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom info bar — sits below the image, no overlap */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 sm:px-10 py-5"
                  style={{
                    background:
                      "linear-gradient(160deg, hsl(190, 60%, 12%) 0%, hsl(190, 55%, 17%) 50%, hsl(174, 80%, 22%) 100%)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warm/20 shrink-0">
                      <Mic className="h-5 w-5 text-warm" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Heart className="h-3.5 w-3.5 text-warm" fill="currentColor" />
                        <span className="text-primary-foreground/50 text-xs font-semibold tracking-widest uppercase">
                          Midway Health Inc.
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-primary-foreground leading-tight">
                        Expert Health Talks to Keep You Informed
                      </h3>
                    </div>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(true);
                    }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/15 text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary-foreground/20 transition-all duration-300 w-full sm:w-auto justify-center backdrop-blur-sm shrink-0"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-warm text-warm-foreground">
                      <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
                    </span>
                    Watch Now
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HealthTalkVideo;
