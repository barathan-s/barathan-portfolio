"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import Image from "next/image";

export function Projects() {
  const projects = [
    {
      title: "Isolation of Bacteria from Soil & Plant Samples and Genomic DNA Extraction",
      category: "Environmental Microbiology",
      image: "/images/project-3.jpg",
      description: "Conducted comprehensive research on bacterial isolation and molecular characterization from environmental samples.",
      methodology: "Colony morphology analysis, Gram staining, biochemical identification, genomic DNA extraction.",
      outcome: "Successfully purified bacterial colonies, evaluated DNA quality, and studied microbial diversity.",
    },
    {
      title: "Antibacterial Activity of Moringa oleifera Leaf Extract",
      category: "Medical Microbiology",
      image: "/images/project-1.jpg",
      description: "A plant-derived antimicrobial investigation focusing on bacterial growth inhibition against Escherichia coli and Staphylococcus aureus.",
      methodology: "Plant extract preparation, disc diffusion assay, incubation, zone of inhibition measurement.",
      outcome: "Observed significant antimicrobial activity, demonstrating therapeutic potential against Staphylococcus aureus.",
    },
    {
      title: "VAM Fungi Root Colonization",
      category: "Plant Microbiology",
      image: "/images/project-2.jpg",
      description: "Investigated plant-microbe interactions by observing mycorrhizal fungi and fungal colonization associated with plant roots.",
      methodology: "Root sample collection, KOH clearing, Trypan blue staining, microscopic identification.",
      outcome: "Successfully visualized VAM fungal structures (hyphae, arbuscules, vesicles), confirming mycorrhizal colonization.",
    }
  ];

  return (
    <section id="projects" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          title="Research Projects" 
          subtitle="Academic and independent research exploring the applications of microbiology."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group glass-card h-full flex flex-col hover:border-secondary/50 transition-colors"
            >
              {/* Image Placeholder */}
              <div className="relative w-full h-48 bg-primary/80 overflow-hidden flex items-center justify-center border-b border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-semibold tracking-wider text-secondary uppercase z-10">
                  {project.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase text-accent font-semibold tracking-wider mb-1">Methodology</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{project.methodology}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-secondary font-semibold tracking-wider mb-1">Outcome</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{project.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
