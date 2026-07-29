"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { User, BookOpen, Globe2, Code2 } from "lucide-react";

export function About() {
  const details = [
    { label: "Full Name", value: "BARATHAN S", icon: <User className="text-secondary w-5 h-5" /> },
    { label: "Education", value: "B.Sc. Microbiology", icon: <BookOpen className="text-secondary w-5 h-5" /> },
    { label: "Languages", value: "English, Tamil", icon: <Globe2 className="text-secondary w-5 h-5" /> },
    { label: "Tech Skills", value: "Excel, Power BI", icon: <Code2 className="text-secondary w-5 h-5" /> },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader 
          title="About Me" 
          subtitle="A passionate microbiologist bridging the gap between biological research and technological innovation."
        />

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="glass-card p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -z-10" />
              
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Career Objective</h3>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                To secure a challenging position in a reputable research institute or biotechnology company where I can apply my knowledge of microbiology to contribute to groundbreaking discoveries. I am dedicated to improving healthcare, environmental sustainability, and food safety through rigorous scientific methods.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="p-3 rounded-lg bg-primary/50 shadow-inner">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium">{detail.label}</p>
                      <p className="text-white font-semibold">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="glass-card p-6 aspect-square flex flex-col justify-center items-center text-center">
                  <h4 className="text-4xl font-bold text-secondary mb-2">10+</h4>
                  <p className="text-white/70 font-medium">Lab Techniques</p>
                </div>
                <div className="glass-card p-6 aspect-square flex flex-col justify-center items-center text-center">
                  <h4 className="text-4xl font-bold text-accent mb-2">3+</h4>
                  <p className="text-white/70 font-medium">Research Projects</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-6 aspect-square flex flex-col justify-center items-center text-center">
                  <h4 className="text-4xl font-bold text-secondary mb-2">3</h4>
                  <p className="text-white/70 font-medium">Years of Study</p>
                </div>
                <div className="glass-card p-6 aspect-square flex flex-col justify-center items-center text-center">
                  <h4 className="text-4xl font-bold text-accent mb-2">2</h4>
                  <p className="text-white/70 font-medium">Internships</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
