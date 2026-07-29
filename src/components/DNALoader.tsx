"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DNALoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time, or listen to actual document load state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onAnimationComplete={() => setLoading(false)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
    >
      <div className="relative flex flex-col items-center justify-center h-40">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex w-16 justify-between items-center my-1 relative">
            <motion.div
              className="w-3 h-3 rounded-full bg-secondary"
              animate={{
                x: [0, 40, 0],
                scale: [1, 1.2, 1],
                zIndex: [1, 2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-0.5 w-full bg-white/20 -translate-x-1/2 -translate-y-1/2 -z-10"
              animate={{
                scaleX: [1, 0, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-accent"
              animate={{
                x: [0, -40, 0],
                scale: [1, 0.8, 1],
                zIndex: [2, 1, 2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          </div>
        ))}
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-accent font-serif tracking-widest text-lg"
      >
        INITIALIZING SEQUENCE
      </motion.p>
    </motion.div>
  );
}
