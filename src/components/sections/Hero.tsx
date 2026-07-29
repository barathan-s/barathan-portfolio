"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";

import { useEffect, useRef } from "react";



export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block py-1 px-3 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium text-sm mb-6"
          >
            B.Sc. Microbiology Graduate
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            BARATHAN S
          </h1>
          
          <h2 className="text-xl md:text-2xl text-accent font-light tracking-wide mb-6">
            Research • Laboratory • Microbiology
          </h2>
          
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Passionate microbiology researcher dedicated to exploring the unseen world. 
            Specializing in microbiology, environmental research, and laboratory diagnostics 
            with a commitment to scientific excellence and discovery.
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a 
              href="#projects"
              className="flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-medium transition-all hover:bg-secondary/90 hover:scale-105 shadow-lg shadow-secondary/25"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              <Download size={18} />
              Resume
            </a>
            
            <a 
              href="#contact"
              className="flex items-center gap-2 px-6 py-4 text-white/70 hover:text-accent transition-colors font-medium"
            >
              <Mail size={18} />
              Contact
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative"
        >
          {/* Professional Image Placeholder */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-accent/40 rounded-full blur-2xl animate-pulse-glow" />
            <div className="relative w-full h-full rounded-full border-2 border-white/20 p-2 glass-card overflow-hidden">
              <div className="w-full h-full rounded-full bg-primary/80 overflow-hidden relative border border-white/10">
                <Image
                  src="/images/profile.jpg"
                  alt="Barathan S Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 384px"
                  priority
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-2xl flex items-center justify-center border-t border-l border-white/40 shadow-xl"
            >
              <span className="text-secondary text-2xl font-bold">🧬</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-4 w-24 h-24 glass-card rounded-full flex items-center justify-center border-t border-l border-white/40 shadow-xl"
            >
              <span className="text-accent text-3xl font-bold">🔬</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
