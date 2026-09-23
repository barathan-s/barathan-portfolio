"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText } from "lucide-react";

export function MicrobiologyCVButton() {
  const [hoverState, setHoverState] = useState<"idle" | "animating" | "ready">("idle");
  const [animationStep, setAnimationStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseEnter = () => {
    if (isReducedMotion || hoverState === "ready") return;
    setHoverState("animating");
    setAnimationStep(1); // Particles active

    // Sequence timing
    setTimeout(() => {
      if (hoverState !== "idle") setAnimationStep(2);
    }, 400); // Scan line
    setTimeout(() => {
      if (hoverState !== "idle") setAnimationStep(3);
    }, 900); // DNA formation
    setTimeout(() => {
      if (hoverState !== "idle") setAnimationStep(4);
    }, 1400); // CV formation
    setTimeout(() => {
      if (hoverState !== "idle") {
        setAnimationStep(5);
        setHoverState("ready");
      }
    }, 1900); // Ready state
  };

  const handleMouseLeave = () => {
    if (hoverState !== "ready") {
      setHoverState("idle");
      setAnimationStep(0);
    }
  };

  const handleReset = () => {
    setTimeout(() => {
      setHoverState("idle");
      setAnimationStep(0);
    }, 1000);
  };

  // Generate deterministic subtle particles
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const radius = 40;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 0.1,
      size: i % 3 === 0 ? 3 : 2,
    };
  });

  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleReset}
      className={`relative flex items-center justify-center h-14 min-w-[180px] rounded-full border transition-all duration-300 overflow-hidden group backdrop-blur-sm
        ${
          hoverState === "ready" || hoverState === "animating"
            ? "bg-secondary/10 border-secondary/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            : "bg-white/5 border-white/10 hover:border-white/30"
        }
      `}
    >
      {/* Reduced Motion State */}
      {isReducedMotion ? (
        <span className="flex items-center gap-2 px-6 font-medium text-white transition-colors group-hover:text-secondary">
          <Download size={18} />
          Download CV
        </span>
      ) : (
        <>
          {/* Default Content (Visible only in idle) */}
          <motion.div
            animate={{ opacity: hoverState === "idle" ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center gap-2 font-medium text-white"
          >
            <Download size={18} />
            Resume
          </motion.div>

          {/* Animation Container */}
          <AnimatePresence>
            {hoverState !== "idle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* 1. Particles & 3. DNA */}
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-accent"
                    initial={{
                      x: p.x,
                      y: p.y,
                      opacity: 0.2,
                      width: p.size,
                      height: p.size,
                    }}
                    animate={
                      animationStep >= 4
                        ? { x: 0, y: 0, opacity: 0, scale: 0 } // Collapse to center
                        : animationStep === 3
                        ? {
                            // DNA shape approximation
                            x: Math.sin(p.id * 0.8) * 20,
                            y: (p.id % 2 === 0 ? -1 : 1) * 10,
                            opacity: 0.8,
                            scale: 1.5,
                            backgroundColor: "#10B981", // Secondary (emerald)
                          }
                        : animationStep >= 1
                        ? {
                            // Active particles
                            x: p.x * 0.5,
                            y: p.y * 0.5,
                            opacity: 0.6,
                            scale: 1.2,
                            backgroundColor: "#67E8F9", // Accent (teal)
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      bounce: 0.2,
                    }}
                  />
                ))}

                {/* 2. Microscope Scan Line */}
                <AnimatePresence>
                  {animationStep === 2 && (
                    <motion.div
                      initial={{ x: "-100px", opacity: 0 }}
                      animate={{ x: "100px", opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "linear" }}
                      className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent blur-[1px]"
                    />
                  )}
                </AnimatePresence>

                {/* 4. CV Formation & 5. Ready */}
                <AnimatePresence>
                  {animationStep >= 4 && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="flex items-center gap-2 font-medium text-secondary relative overflow-hidden px-4 py-2"
                    >
                      <motion.div
                        animate={
                          animationStep === 4
                            ? {
                                boxShadow: [
                                  "0 0 0 rgba(16,185,129,0)",
                                  "0 0 10px rgba(16,185,129,0.5)",
                                  "0 0 0 rgba(16,185,129,0)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <FileText size={18} />
                      </motion.div>
                      <span>Download CV ↓</span>
                      
                      {/* Subtly scanning line over the text in Step 4 */}
                      {animationStep === 4 && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle Subtle Particles around the button */}
          <AnimatePresence>
            {hoverState === "idle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                {particles.slice(0, 6).map((p) => (
                  <motion.div
                    key={`idle-${p.id}`}
                    className="absolute w-1 h-1 rounded-full bg-accent/30"
                    animate={{
                      y: [0, p.y * 0.2, 0],
                      x: [0, p.x * 0.2, 0],
                      opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                      duration: 3 + p.delay * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      marginLeft: p.x,
                      marginTop: p.y,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </a>
  );
}
