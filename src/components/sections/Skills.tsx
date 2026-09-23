"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { 
  Dna, 
  Droplets, 
  FlaskConical, 
  Flame, 
  Microscope, 
  TestTube2, 
  ShieldAlert, 
  FileText, 
  ClipboardCheck, 
  ShieldCheck, 
  Factory, 
  TableProperties, 
  LineChart 
} from "lucide-react";

const skillsData = [
  // Laboratory Techniques
  { name: "Microbial Isolation", icon: Dna, category: "lab", color: "#38bdf8" },
  { name: "Serial Dilution", icon: Droplets, category: "lab", color: "#38bdf8" },
  { name: "Spread Plate Technique", icon: FlaskConical, category: "lab", color: "#38bdf8" },
  { name: "Gram Staining", icon: Droplets, category: "lab", color: "#818cf8" },
  { name: "Simple Staining", icon: Droplets, category: "lab", color: "#818cf8" },
  { name: "Biochemical Tests", icon: TestTube2, category: "lab", color: "#fbbf24" },
  { name: "Microscopy", icon: Microscope, category: "lab", color: "#a78bfa" },
  { name: "Differential Staining", icon: Droplets, category: "lab", color: "#f87171" },
  { name: "Microbial Culture Techniques", icon: FlaskConical, category: "lab", color: "#34d399" },
  
  // Molecular Microbiology
  { name: "Genomic DNA Extraction", icon: Dna, category: "molecular", color: "#f43f5e" },
  { name: "CTAB-based DNA Extraction", icon: Dna, category: "molecular", color: "#f43f5e" },
  { name: "DNA Quality Assessment", icon: Microscope, category: "molecular", color: "#f43f5e" },
  { name: "Agarose Gel Electrophoresis", icon: Flame, category: "molecular", color: "#f43f5e" },
  { name: "Basic Molecular Techniques", icon: TestTube2, category: "molecular", color: "#f43f5e" },

  // Applied Microbiology
  { name: "Environmental Microbiology", icon: ShieldAlert, category: "applied", color: "#34d399" },
  { name: "Industrial Microbiology", icon: Factory, category: "applied", color: "#34d399" },
  { name: "Food Microbiology", icon: Droplets, category: "applied", color: "#34d399" },
  { name: "Antimicrobial Testing", icon: ShieldCheck, category: "applied", color: "#34d399" },
  { name: "Plant-Microbe Interactions", icon: FlaskConical, category: "applied", color: "#34d399" },
  { name: "Microbial Ecology", icon: Dna, category: "applied", color: "#34d399" },

  // Quality & Industry
  { name: "HACCP", icon: ShieldCheck, category: "industry", color: "#10b981" },
  { name: "GMP", icon: Factory, category: "industry", color: "#6366f1" },
  { name: "Laboratory Hygiene", icon: ShieldAlert, category: "industry", color: "#2dd4bf" },
  { name: "Quality Control", icon: ClipboardCheck, category: "industry", color: "#10b981" },

  // Digital / Technical
  { name: "Microsoft Excel", icon: TableProperties, category: "digital", color: "#22c55e" },
  { name: "Power BI", icon: LineChart, category: "digital", color: "#eab308" },
  { name: "Basic Programming", icon: FileText, category: "digital", color: "#94a3b8" },
  { name: "Bioinformatics Fundamentals", icon: Dna, category: "digital", color: "#818cf8" },
];


// Interactive 3D Card Component
function Skill3DCard({ skill, index }: { skill: typeof skillsData[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position to rotation degrees (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Parallax effect for the inner icon
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="relative h-40 group cursor-pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 rounded-2xl border border-white/10 bg-[#0A1024]/60 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:border-white/30 group-hover:bg-[#0A1024]/80 shadow-lg group-hover:shadow-[0_10px_30px_rgba(56,189,248,0.2)]"
      >
        {/* Dynamic Glow Background based on mouse */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`
          }}
        />

        {/* 3D Floating Content */}
        <motion.div
          style={{
            x: translateX,
            y: translateY,
            translateZ: 50, // pushes content closer to viewer
          }}
          className="flex flex-col items-center gap-3 z-10"
        >
          <div 
            className="p-3 rounded-full"
            style={{ 
              backgroundColor: `${skill.color}15`,
              boxShadow: `0 0 15px ${skill.color}40`,
              border: `1px solid ${skill.color}40`
            }}
          >
            <Icon 
              size={28} 
              style={{ color: skill.color }} 
              className="drop-shadow-lg"
            />
          </div>
          
          <span className="text-sm font-semibold text-white/90 text-center tracking-wide group-hover:text-white transition-colors drop-shadow-md">
            {skill.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const categories = [
    { id: "lab", title: "Laboratory Techniques", icon: "🔬" },
    { id: "molecular", title: "Molecular Microbiology", icon: "🧬" },
    { id: "applied", title: "Applied Microbiology", icon: "🧪" },
    { id: "industry", title: "Quality & Industry", icon: "🏭" },
    { id: "digital", title: "Digital & Technical", icon: "💻" }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent z-0" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader 
          title="Laboratory & Technical Skills" 
          subtitle="A premium toolkit of microbiological techniques and industry standards."
        />

        <div className="flex flex-col gap-16 max-w-6xl mx-auto mt-12">
          {categories.map((cat, catIndex) => {
            const catSkills = skillsData.filter(s => s.category === cat.id);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat.id}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="text-3xl drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">{cat.icon}</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wider">{cat.title}</h3>
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {catSkills.map((skill, index) => (
                    <Skill3DCard key={skill.name} skill={skill} index={index + catIndex * 4} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
