import { motion } from "framer-motion";

const messages = [
  "We Care, But God Heals",
  "A Sound Mind in a Healthy Body",
  "Compassion is the Heart of Healing",
  "Your Health, Our Mission",
  "Healing Hands, Faithful Hearts",
  "Where Science Meets Compassion",
];

const InspirationalMarquee = () => {
  const doubled = [...messages, ...messages];

  return (
    <div className="overflow-hidden gradient-primary py-3.5">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((msg, i) => (
           <span key={i} className="flex items-center gap-12 text-sm font-medium tracking-widest uppercase text-primary-foreground">
            <span>{msg}</span>
            <span className="text-primary-foreground/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InspirationalMarquee;
