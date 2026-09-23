"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function Education() {
  const educationData = [
    {
      degree: "Master of Science in Microbiology",
      institution: "Annamalai University",
      university: "Annamalai University",
      period: "Present",
      location: "Chidambaram, India",
      description: "Advanced studies focusing on microbial sciences, molecular microbiology, and innovative research-driven solutions."
    },
    {
      degree: "Bachelor of Science in Microbiology",
      institution: "Sri Manakula Vinayagar Engineering College",
      university: "Pondicherry University",
      period: "2023 – 2026",
      location: "Puducherry, India",
      description: "Comprehensive study of microbial physiology, genetics, environmental microbiology, and applied microbiology. Participated in multiple laboratory sessions focused on modern microbiological techniques."
    },
    {
      degree: "Higher Secondary (12th Grade)",
      institution: "St. Joseph Higher Secondary School",
      university: "Tamil Nadu State Board",
      period: "Graduated 2023",
      location: "Cuddalore, India",
      description: "Secured 81% in board examinations with a strong focus on biological sciences."
    }
  ];

  return (
    <section id="education" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          title="Education" 
          subtitle="My academic journey and qualifications in the field of Microbiology."
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col md:flex-row items-start md:justify-between w-full mb-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 top-6 w-3 h-3 bg-secondary rounded-full md:-translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10" />
              
              <div className="hidden md:block w-[45%] text-right pr-12 pt-4">
                <span className="inline-flex items-center gap-2 text-secondary font-bold text-lg">
                  <Calendar size={18} />
                  {edu.period}
                </span>
              </div>

              <div className="w-full md:w-[45%] pl-8 md:pl-12">
                <div className="glass-card p-8">
                  <div className="md:hidden inline-flex items-center gap-2 text-secondary font-bold text-sm mb-4">
                    <Calendar size={16} />
                    {edu.period}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-secondary/20 text-secondary rounded-lg">
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      {edu.degree}
                    </h3>
                  </div>
                  
                  <h4 className="text-lg text-accent font-medium mb-1 mt-4">
                    {edu.institution}
                  </h4>
                  <p className="text-white/60 text-sm mb-4">
                    Affiliated to {edu.university}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
                    <MapPin size={14} />
                    {edu.location}
                  </div>
                  
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
