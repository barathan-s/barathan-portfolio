"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download } from "lucide-react";

export function ScientificCVCard() {
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

  const handleInteractionStart = () => {
    if (isReducedMotion || hoverState === "animating" || hoverState === "ready") return;
    setHoverState("animating");
    setAnimationStep(1); // Particles active
    
    // Timeline
    setTimeout(() => { if (hoverState !== "idle") setAnimationStep(2); }, 300); // Scan starts
    setTimeout(() => { if (hoverState !== "idle") setAnimationStep(3); }, 800); // DNA formation
    setTimeout(() => { if (hoverState !== "idle") setAnimationStep(4); }, 1500); // CV formation
    setTimeout(() => {
      if (hoverState !== "idle") {
        setAnimationStep(5); // Ready
        setHoverState("ready");
      }
    }, 2000);
  };

  const handleInteractionEnd = () => {
    if (hoverState !== "ready") {
      setHoverState("idle");
      setAnimationStep(0);
    }
  };

  const handleReset = () => {
    setTimeout(() => {
      setHoverState("idle");
      setAnimationStep(0);
    }, 1000); // Reset after download
  };

  // Generate 12 deterministic scientific particles
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const radius = 45;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 0.05,
      size: i % 3 === 0 ? 3 : 2,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.6 }} // Staggered after subtitle (0.4)
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      className="max-w-md mx-auto relative group"
    >
      <motion.div
        animate={
          hoverState !== "idle" && !isReducedMotion
            ? { y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(16,185,129,0.15)", borderColor: "rgba(103,232,249,0.3)" }
            : { y: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.1)" }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-[#0B132B] p-10 flex flex-col items-center rounded-2xl border overflow-hidden"
      >
        {/* Animated Central Area */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          
          {/* Default CV Icon - Animated entrance (delay 0.8) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`absolute inset-0 bg-secondary/5 rounded-full border border-secondary/20 transition-all duration-500 flex items-center justify-center
              ${hoverState !== "idle" && !isReducedMotion ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
          >
            <FileText className="w-12 h-12 text-secondary/70" />
          </motion.div>

          {/* Animation Sequence */}
          {!isReducedMotion && hoverState !== "idle" && (
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Particles & DNA Transformation */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-accent"
                  initial={{ x: p.x, y: p.y, opacity: 0 }}
                  animate={
                    animationStep >= 4
                      ? { x: 0, y: 0, opacity: 0, scale: 0 } // Dissolve to center
                      : animationStep === 3
                      ? { // DNA Helix
                          x: Math.sin(p.id * 1.5) * 15,
                          y: (p.id % 2 === 0 ? -12 : 12) + Math.cos(p.id * 0.5) * 4,
                          opacity: 0.9,
                          scale: 1.2,
                          backgroundColor: "#10B981", // Emerald
                          boxShadow: "0 0 10px rgba(16,185,129,0.5)"
                        }
                      : animationStep >= 1
                      ? { // Active orbiting particles
                          x: p.x * 0.8, 
                          y: p.y * 0.8, 
                          opacity: 0.7, 
                          scale: 1, 
                          backgroundColor: "#67E8F9" // Teal
                        }
                      : {}
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ))}

              {/* Microscope Scan Line */}
              <AnimatePresence>
                {animationStep >= 2 && animationStep < 4 && (
                  <motion.div
                    initial={{ top: "-10%", opacity: 0 }}
                    animate={{ top: "110%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="absolute inset-x-[-10px] h-0.5 bg-accent/80 shadow-[0_0_8px_rgba(103,232,249,0.8)] blur-[0.5px]"
                  />
                )}
              </AnimatePresence>

              {/* CV Formation */}
              <AnimatePresence>
                {animationStep >= 4 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative flex items-center justify-center w-full h-full"
                  >
                    <motion.div
                      animate={{ 
                        boxShadow: animationStep === 4 ? ["0 0 0 rgba(16,185,129,0)", "0 0 25px rgba(16,185,129,0.6)", "0 0 10px rgba(16,185,129,0.2)"] : "0 0 10px rgba(16,185,129,0.2)",
                        borderColor: "rgba(16,185,129,0.6)"
                      }}
                      transition={{ duration: 0.5 }}
                      className="bg-secondary/10 p-5 rounded-full border border-secondary/40 relative overflow-hidden"
                    >
                      <FileText className="w-10 h-10 text-secondary drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                      
                      {/* Subtly scanning highlight inside CV */}
                      {animationStep === 4 && (
                        <motion.div
                          initial={{ top: "-50%" }}
                          animate={{ top: "150%" }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-white/40 to-transparent skew-y-12 blur-[1px]"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }} // Entrance animation
        >
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleReset}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 relative z-20 overflow-hidden
              ${(hoverState === "ready" || isReducedMotion) 
                ? 'bg-secondary text-white border border-secondary shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-white/5 text-white/90 border border-white/20'
              }
            `}
          >
            <motion.div
              animate={hoverState === "ready" || hoverState === "animating" ? { y: 2 } : { y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Download size={18} />
            </motion.div>
            <span className="relative z-10">Download CV</span>
            
            {/* Button Highlight Effect on Hover */}
            {!isReducedMotion && (hoverState === "animating" || hoverState === "ready") && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
              />
            )}
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
