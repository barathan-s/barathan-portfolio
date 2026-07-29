"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dna, FlaskConical, Microscope, Atom, ClipboardList, Hexagon, Grid2X2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home", icon: Hexagon },
  { name: "About", href: "#about", icon: Dna },
  { name: "Skills", href: "#skills", icon: FlaskConical },
  { name: "Projects", href: "#projects", icon: Grid2X2 },
  { name: "Resume", href: "#resume", icon: ClipboardList },
  { name: "Gallery", href: "#gallery", icon: Microscope },
  { name: "Contact", href: "#contact", icon: Atom },
];




export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Scroll spy logic
      const sections = navLinks.map(link => link.name);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
      sections.reverse(); // put it back
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "py-4 bg-[#050B1A]/80 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="text-2xl font-serif font-bold text-white tracking-wider flex items-center gap-2 z-10 relative group" onClick={() => setActiveSection("Home")}>
          <span className="text-secondary drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">B</span>ARATHAN
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-6 z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            const isHovered = hoveredSection === link.name;
            const Icon = link.icon;
            
            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredSection(link.name)}
                onMouseLeave={() => setHoveredSection(null)}
                className="relative px-3 py-2 flex items-center gap-2 group"
                onClick={() => setActiveSection(link.name)}
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="absolute -left-3 text-secondary drop-shadow-[0_0_5px_rgba(56,189,248,0.8)]"
                    >
                      <Icon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.span 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-secondary" : "text-white/70 hover:text-white"
                  }`}
                  animate={{ scale: isHovered ? 1.05 : 1, x: isHovered ? 8 : 0 }}
                  style={{
                    textShadow: isHovered ? "0 0 8px rgba(56,189,248,0.5)" : "none"
                  }}
                >
                  {link.name}
                </motion.span>
                
                {/* Active Underline (Sliding DNA Strand) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary"
                    style={{
                      boxShadow: "0 0 10px rgba(56,189,248,0.8), 0 0 20px rgba(56,189,248,0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          
          <div className="ml-4 pl-4 border-l border-white/10">
            <a 
              href="#contact"
              className="px-6 py-2.5 text-sm font-bold rounded-full bg-secondary/10 border border-secondary/50 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              Hire Me
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#050B1A]/95 backdrop-blur-2xl border-t border-white/10 md:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-4 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                const Icon = link.icon;
                
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`relative text-lg font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-3 ${
                      isActive ? "text-secondary bg-secondary/10" : "text-white hover:text-secondary hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-secondary drop-shadow-[0_0_5px_rgba(56,189,248,0.8)]" : "text-white/50"} />
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavMobile"
                        className="absolute inset-0 border border-secondary/30 rounded-full"
                        style={{
                          boxShadow: "inset 0 0 10px rgba(56,189,248,0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

