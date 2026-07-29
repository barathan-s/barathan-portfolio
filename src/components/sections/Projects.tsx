"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import Image from "next/image";

export function Projects() {
  const projects = [
    {
     
  title: "Antibacterial Activity of Moringa oleifera Leaf Extract",
  category: "Medical Microbiology",
  image: "/images/project-1.jpg",
  description: "Investigated the antibacterial potential of Moringa oleifera leaf extracts against Escherichia coli and Staphylococcus aureus using the disc diffusion method with ethanol and acetone extracts.",
  methodology: "Leaf Collection, Solvent Extraction (Ethanol & Acetone), Nutrient Agar Preparation, Disc Diffusion Assay, Incubation, Zone of Inhibition Measurement.",
  outcome: "Observed significant antibacterial activity, with acetone extract showing the highest inhibition against Staphylococcus aureus, demonstrating the therapeutic potential of Moringa oleifera.",
},
  
    {
      title: "Observation of Vesicular Arbuscular Mycorrhizal (VAM) Fungi",
     category: "Plant Microbiology",
image: "/images/project-2.jpg",
description: "Observed and identified Vesicular Arbuscular Mycorrhizal (VAM) fungi associated with plant roots using microscopic examination to study their symbiotic relationship and colonization patterns.",
methodology: "Root sample collection, KOH clearing, acidification with HCl, Trypan Blue staining, microscopic observation, and identification of vesicles, arbuscules, and hyphal structures.",
outcome: "Successfully visualized VAM fungal structures within plant roots, confirming mycorrhizal colonization and demonstrating their role in enhancing nutrient uptake and plant growth."
    },
    {
      title: "Isolation of Bacteria from Soil & Plant Samples and Genomic DNA Extraction",
      category: "Environmental Microbiology",
      image: "/images/project-3.jpg",
      description: "Conducted comprehensive research involving isolation and characterization of bacteria from soil/leaf samples, and genomic DNA extraction from plant tissues.",
      methodology: "Serial Dilution, Spread Plate, Gram Staining, Biochemical Tests, CTAB DNA Extraction, Agarose Gel Electrophoresis.",
      outcome: "Successfully purified bacterial colonies, evaluated DNA quality using spectrophotometry, and studied microbial diversity.",
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
