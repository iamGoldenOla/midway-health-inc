import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('preloader-shown');
    if (hasVisited) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('preloader-shown', 'true');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'hsl(220 65% 12%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: 'hsl(42 85% 55%)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            {/* Logo reveal */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{ background: 'hsl(220 60% 22%)' }}
                animate={{ 
                  boxShadow: [
                    '0 0 0px hsl(42 85% 55% / 0)',
                    '0 0 40px hsl(42 85% 55% / 0.4)',
                    '0 0 20px hsl(42 85% 55% / 0.2)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="font-heading font-bold text-4xl md:text-5xl"
                  style={{ color: 'hsl(42 85% 55%)' }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  A
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h1 className="font-heading font-bold text-xl md:text-2xl tracking-[0.3em] text-white/90">
                AKINOLA OLUJOBI
              </h1>
              <motion.div
                className="h-0.5 mx-auto mt-3 rounded-full"
                style={{ background: 'hsl(42 85% 55%)' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-40 h-0.5 rounded-full overflow-hidden mt-4"
              style={{ background: 'hsl(220 60% 22%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'hsl(42 85% 55%)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
