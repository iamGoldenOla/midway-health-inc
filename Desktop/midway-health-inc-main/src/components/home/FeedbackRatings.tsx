import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ratings = [
  { label: "Quality of Care", score: 4.9, max: 5 },
  { label: "Patient Satisfaction", score: 4.8, max: 5 },
  { label: "Staff Professionalism", score: 4.9, max: 5 },
  { label: "Responsiveness", score: 4.7, max: 5 },
];

const FeedbackRatings = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-foreground" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-14 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <span className="text-warm text-sm font-semibold tracking-wider uppercase">
            What Our Patients Say
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-background mt-3 leading-[1.1]">
            Feedback Ratings
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {ratings.map((item, i) => {
            const percentage = (item.score / item.max) * 100;
            return (
              <motion.div
                key={item.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 ${
                  isVisible ? "" : "opacity-0"
                }`}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              >
                {/* Label */}
                <p className="text-background font-semibold text-base sm:text-lg min-w-[200px] shrink-0">
                  {item.label}
                </p>

                {/* Progress bar */}
                <div className="flex-1 h-3 rounded-full bg-background/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, hsl(120, 60%, 50%), hsl(174, 100%, 29%), hsl(270, 60%, 55%))",
                    }}
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${percentage}%` } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.4 + i * 0.15,
                      ease: "easeOut",
                    }}
                  />
                </div>

                {/* Score */}
                <motion.span
                  className="text-background font-bold text-lg min-w-[40px] text-right"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  {item.score}
                </motion.span>

                {/* Review badge */}
                <motion.a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warm text-warm-foreground font-semibold text-xs sm:text-sm tracking-wide hover:brightness-110 transition-all shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.15, ease: "backOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="h-3.5 w-3.5" fill="currentColor" />
                  Google Review
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeedbackRatings;
