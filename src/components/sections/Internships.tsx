"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { Building2, Microscope } from "lucide-react";

export function Internships() {
  const internships = [
    {
      title: "Research Internship",
      company: "State Forest Research Institute",
      icon: <Microscope className="w-8 h-8 text-secondary" />,
      color: "from-secondary/20 to-transparent",
      description: "Conducted field and laboratory research focusing on environmental microbiology. Assisted senior scientists in sample collection, processing, and data documentation. Gained practical experience in applying microbiological concepts to forestry and environmental conservation."
    },
    {
      title: "Industrial Internship",
      company: "Creamline Dairy Products",
      icon: <Building2 className="w-8 h-8 text-accent" />,
      color: "from-accent/20 to-transparent",
      description: "Gained hands-on experience in food microbiology and industrial quality control. Participated in routine microbial testing of dairy products, hygiene monitoring, and learned about HACCP and GMP standards in a commercial manufacturing environment."
    }
  ];

  return (
    <section id="internships" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader 
          title="Professional Experience" 
          subtitle="Real-world industry and research exposure."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {internships.map((internship, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative glass-card p-8 group overflow-hidden"
            >
              {/* Subtle Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${internship.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                  {internship.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {internship.title}
                </h3>
                
                <h4 className="text-lg text-white/80 font-serif italic mb-6">
                  {internship.company}
                </h4>
                
                <p className="text-white/60 leading-relaxed text-sm">
                  {internship.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
