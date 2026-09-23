"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { Dna, Droplets, Factory, TestTube2, Stethoscope } from "lucide-react";

export function Research() {
  const interests = [
    { name: "Microbial Diversity & Ecology", icon: <Dna size={24} /> },
    { name: "Molecular Microbiology", icon: <Dna size={24} /> },
    { name: "Environmental Microbiology", icon: <TestTube2 size={24} /> },
    { name: "Industrial Microbiology", icon: <Factory size={24} /> },
    { name: "Medical Microbiology", icon: <Stethoscope size={24} /> },
    { name: "Antimicrobial Research", icon: <Stethoscope size={24} /> },
    { name: "Plant-Microbe Interactions", icon: <Droplets size={24} /> },
    { name: "Food Microbiology", icon: <Droplets size={24} /> },
    { name: "Applied Microbiology", icon: <TestTube2 size={24} /> },
    { name: "Microbial Biotechnology", icon: <Dna size={24} /> },
  ];

  return (
    <section id="research" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <SectionHeader 
          title="Research Interests" 
          subtitle="Areas of scientific inquiry and focus."
        />

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mt-12">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-4 glass-card cursor-default group hover:bg-secondary/10 hover:border-secondary/30 transition-all"
            >
              <div className="text-white/50 group-hover:text-secondary transition-colors">
                {interest.icon}
              </div>
              <span className="text-white font-medium">{interest.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
