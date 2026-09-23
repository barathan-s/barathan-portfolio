"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView, useSpring } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import { 
  Award, FileText, X, ChevronLeft, ChevronRight, 
  CheckCircle, Download, Activity, Clock, Building,
  Star, Microscope, Brain, Database, BookOpen
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { MicrobiologyCVButton } from "../ui/MicrobiologyCVButton";
import { ScientificCVCard } from "../ui/ScientificCVCard";

// --- Mock Data ---
// --- Mock Data ---

const certificates = [
  {
  id: 1,
  title: "State Forest Research Institute Internship",
  issuer: "Tamil Nadu Forest Department",
  category: "Research Internship",
  date: "May 2025 – Jun 2025",
  skills: [
    "Environmental Microbiology",
    "Laboratory Techniques",
    "Forest Research"
  ],
  description: "Completed a one-month internship at the State Forest Research Institute, Chennai, gaining practical experience in environmental microbiology, microbial isolation, and laboratory research.",
  verified: true,
  featured: true,
  image: "/images/certificates/certificate-1.jpg"
},
{
  id: 2,
  title: "International Internship in Microbiology Laboratory Techniques",
  issuer: "Sacred Heart College & Biotechnology Society of Nepal",
  category: "International Internship",
  date: "May 2025 – Jun 2025",
  skills: [
    "Microbiology",
    "Laboratory Techniques",
    "Microbial Analysis"
  ],
  description: "Successfully completed a four-week international internship in Microbiology Laboratory Techniques (Phase III) with Distinction.",
  verified: true,
  featured: true,
  image: "/images/certificates/certificate-2.jpg"
},
{
  id: 3,
  title: "National Conference on Conservation of Biological Diversity",
  issuer: "Kanchi Mamunivar Government Institute",
  category: "Conference",
  date: "Nov 2025",
  skills: [
    "Scientific Presentation",
    "Plant Microbiology",
    "Research Communication"
  ],
  description: "Presented the paper 'The Invisible Defense: Microbes Protecting Plants' at the National Conference on Conservation of Biological Diversity.",
  verified: true,
  featured: true,
  image: "/images/certificates/certificate-3.jpg"
},
{
  id: 4,
  title: "National Workshop on Phytochemical Analysis",
  issuer: "Rathinam Centre for Lifescience",
  category: "Workshop",
  date: "Sep 2024",
  skills: [
    "Phytochemical Analysis",
    "Medicinal Plants",
    "Laboratory Methods"
  ],
  description: "Participated in a national workshop on phytochemical analysis of medicinal plants and laboratory extraction techniques.",
  verified: true,
  featured: false,
  image: "/images/certificates/certificate-4.jpg"
},
{
  id: 5,
  title: "ChatGPT Bootcamp",
  issuer: "LetsUpgrade",
  category: "Artificial Intelligence",
  date: "Feb 2025",
  skills: [
    "Prompt Engineering",
    "Generative AI",
    "AI Productivity"
  ],
  description: "Completed an intensive bootcamp covering prompt engineering and practical applications of ChatGPT.",
  verified: true,
  featured: false,
  image: "/images/certificates/certificate-5.jpg"
},
{
  id: 6,
  title: "Power BI Workshop",
  issuer: "OfficeMaster",
  category: "Data Analytics",
  date: "Mar 2025",
  skills: [
    "Power BI",
    "Data Visualization",
    "Dashboard Design"
  ],
  description: "Learned data visualization, dashboard creation, and business intelligence fundamentals using Microsoft Power BI.",
  verified: true,
  featured: false,
  image: "/images/certificates/certificate-6.jpg"
},
{
  id: 7,
  title: "MongoDB Basics for Students",
  issuer: "MongoDB",
  category: "Database",
  date: "Jun 2025",
  skills: [
    "MongoDB",
    "NoSQL",
    "CRUD Operations"
  ],
  description: "Completed introductory training covering MongoDB fundamentals and document database management.",
  verified: true,
  featured: false,
  image: "/images/certificates/certificate-7.jpg"
},
{
  id: 8,
  title: "Medical Coding Workshop",
  issuer: "ThoughtFlows Academy",
  category: "Healthcare",
  date: "Jan 2025",
  skills: [
    "Medical Coding",
    "Healthcare Documentation",
    "Clinical Records"
  ],
  description: "Completed a workshop introducing the fundamentals of medical coding and healthcare documentation standards.",
  verified: true,
  featured: false,
  image: "/images/certificates/certificate-8.jpg"
},
{
  
  id: 9,
  title: "Antibacterial Activity of Moringa oleifera Leaf Extract",
  issuer: "KANCHI MAMUNIVAR GOVERNMENT INSTITUTE FOR POST GRADUATE STUDIES AND RESEARCH",
  category: "Research Project",
  date: "2025",
  skills: [
    "Antimicrobial Assay",
    "Disc Diffusion Method",
    "Microbial Culture",
    "Aseptic Techniques",
    "Data Analysis"
  ],
  description: "Investigated the antibacterial potential of Moringa oleifera leaf extracts against pathogenic bacteria using the Kirby–Bauer disc diffusion method. The study evaluated the effectiveness of different solvent extracts by measuring zones of inhibition.",
  verified: true,
  featured: true,
  image: "/images/certificates/certificate-9.jpg"
}
,
{
  
  id: 10,
  title: "Quality Control of Dairy Products and Production",
  issuer: "Creamline Dairy Products Ltd.",
  category: "Industrial Training",
  date: "18 Dec 2024 – 30 Dec 2024",
  skills: [
    "Dairy Quality Control",
    "Milk Processing",
    "Food Safety",
    "Production Management",
    "Quality Assurance"
  ],
  description: "Completed industrial training at Creamline Dairy Products Ltd., gaining practical exposure to dairy production processes, quality control procedures, milk testing, hygiene standards, and food safety practices in a commercial dairy processing facility.",
  verified: true,
  featured: true,
  image: "/images/certificates/certificate-10.jpg"

}
  
];

type CertificateType = typeof certificates[0];

const categories = ["All", "Research", "Internship", "Conference", "Workshop", "AI", "Analytics", "Database", "Healthcare"];

// --- Helper Components ---

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) ref.current.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={ref}>{from}</span>;
}

// 3D Glassmorphism Premium Card
function VaultCard({ cert, onClick, isFeatured = false }: { cert: CertificateType, onClick: () => void, isFeatured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  // Soft Blue Glow for the glare
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl glass-card border border-white/10 cursor-pointer group flex flex-col shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300 ${isFeatured ? 'md:flex-row h-full' : 'h-full'}`}
    >
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background }} />
      
      {/* Image Preview with Lazy Loading */}
      <div className={`relative bg-black/40 overflow-hidden flex items-center justify-center border-white/5 z-10 shrink-0 ${isFeatured ? 'w-full md:w-2/5 h-64 md:h-full border-r' : 'w-full h-48 border-b'}`}>
        <Image 
          src={cert.image} 
          alt={cert.title} 
          fill 
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-400/20">
          {cert.category}
        </div>

        {/* Shine Animation overlay */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      <div className="p-6 flex flex-col flex-grow z-10 relative">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className={`font-bold text-white leading-tight group-hover:text-blue-400 transition-colors ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
            {cert.title}
          </h3>
          {cert.verified && <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />}
        </div>
        
        <p className="text-white/60 text-sm mb-4 flex items-center gap-2">
          <Building className="w-4 h-4" />
          {cert.issuer}
        </p>

        <p className="text-white/70 text-sm mb-6 line-clamp-2">
          {cert.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {cert.skills.slice(0, 3).map((skill: string, i: number) => (
              <span key={i} className="text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/40 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {cert.date}
            </div>
            
            <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 text-sm font-bold text-blue-400">
              View <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---

export function Achievements() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const featuredCerts = certificates.filter(c => c.featured);
  const regularCerts = certificates.filter(c => !c.featured);
  
  const filteredCerts = regularCerts.filter(cert => {
    return activeFilter === "All" || cert.category === activeFilter;
  });

  // Timeline grouping
  const getYear = (date: string) => date.match(/\d{4}/)?.[0] || "Unknown";
  const timelineYears = Array.from(new Set(certificates.map(c => getYear(c.date)))).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return Number(b) - Number(a);
  });
  // Lightbox Handlers
  const closeLightbox = useCallback(() => setSelectedCert(null), []);
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCert === null) return;
    const currentIndex = certificates.findIndex(c => c.id === selectedCert);
    const nextIndex = (currentIndex + 1) % certificates.length;
    setSelectedCert(certificates[nextIndex].id);
  }, [selectedCert]);
  
  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCert === null) return;
    const currentIndex = certificates.findIndex(c => c.id === selectedCert);
    const prevIndex = currentIndex === 0 ? certificates.length - 1 : currentIndex - 1;
    setSelectedCert(certificates[prevIndex].id);
  }, [selectedCert]);

  // Keyboard Navigation
  useEffect(() => {
    if (selectedCert === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert, closeLightbox, showNext, showPrev]);

  // Lock scroll
  useEffect(() => {
    if (selectedCert !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedCert]);

  const activeCertData = certificates.find(c => c.id === selectedCert);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-transparent">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen opacity-40" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader 
          title="Premium Certifications" 
          subtitle="A comprehensive showcase of my professional qualifications, research internships, and specialized training in Microbiology and Analytics."
        />

        {/* Animated Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20 max-w-6xl mx-auto">
          {[
            { label: "Total Certificates", value: 10, icon: Award },
            { label: "Research Internships", value: 2, icon: Microscope },
            { label: "AI & Analytics", value: 4, icon: Brain },
            { label: "Workshops", value: 2, icon: BookOpen },
            { label: "Conferences", value: 1, icon: Star },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center border-t-2 border-blue-500/50"
            >
              <stat.icon className="w-6 h-6 text-blue-400 mb-3 opacity-80" />
              <div className="text-3xl font-bold text-white mb-1">
                <Counter to={stat.value} />
              </div>
              <div className="text-xs font-medium text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Featured Certifications */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Featured Highlights</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredCerts.map((cert, index) => (
              <motion.div 
                key={cert.id} 
                className={index === 0 ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1"}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <VaultCard cert={cert} onClick={() => setSelectedCert(cert.id)} isFeatured={true} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Chips & Regular Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Database className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Complete Library</h2>
          </div>
          
          <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 w-full gap-2 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeFilter === cat 
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCerts.map((cert) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={cert.id}
                >
                  <VaultCard cert={cert} onClick={() => setSelectedCert(cert.id)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Learning Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Activity className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Learning Progression</h2>
          </div>
          
          <div className="relative border-l border-white/10 ml-4 md:ml-12">
            {timelineYears.map((year, index) => (
              <motion.div 
                key={year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-12 relative pl-8 md:pl-12"
              >
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[8px] top-1 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <h3 className="text-3xl font-black text-white/20 mb-6 -mt-2">{year}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.filter(c => getYear(c.date) === year).map(cert => (
                    <div key={cert.id} onClick={() => setSelectedCert(cert.id)} className="glass-card p-4 rounded-xl cursor-pointer hover:border-blue-500/30 transition-colors flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden relative shrink-0">
                        <Image src={cert.image} alt="" fill className="object-cover opacity-50" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm leading-tight mb-1">{cert.title}</h4>
                        <p className="text-white/50 text-xs">{cert.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert !== null && activeCertData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030816]/95 backdrop-blur-2xl p-4 md:p-12"
            onClick={closeLightbox}
          >
            {/* Controls */}
            <button className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
              <X size={24} />
            </button>
            <button className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all" onClick={showPrev}>
              <ChevronLeft size={32} />
            </button>
            <button className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all" onClick={showNext}>
              <ChevronRight size={32} />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[85vh] flex flex-col md:flex-row bg-[#0A101D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side (Zoom/Pan Support via CSS constraints) */}
              <div className="w-full md:w-2/3 bg-black relative min-h-[300px] h-full flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-white/10 overflow-auto cursor-crosshair group">
                <div className="relative w-full h-full">
                  <Image 
                    src={activeCertData.image} 
                    alt={activeCertData.title} 
                    fill 
                    className="object-contain group-hover:scale-[1.5] transition-transform duration-500 origin-center" 
                  />
                </div>
              </div>
              
              {/* Details Side */}
              <div className="w-full md:w-1/3 p-8 flex flex-col bg-gradient-to-b from-white/[0.02] to-transparent overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded-full">{activeCertData.category}</span>
                    {activeCertData.verified && (
                      <span className="flex items-center gap-1 text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                        <CheckCircle className="w-3 h-3" /> VERIFIED
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{activeCertData.title}</h2>
                  <p className="text-white/60 flex items-center gap-2 text-sm"><Building className="w-4 h-4" /> {activeCertData.issuer}</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-bold">Date of Issue</div>
                    <div className="text-sm font-medium text-white/80 flex items-center gap-2"><Clock className="w-4 h-4" />{activeCertData.date}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-bold">Description</div>
                    <div className="text-sm text-white/70 leading-relaxed">{activeCertData.description}</div>
                  </div>

                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-bold">Skills Assessed</div>
                    <div className="flex flex-wrap gap-2">
                      {activeCertData.skills.map((skill, i) => (
                        <span key={i} className="text-xs font-medium text-white/80 bg-white/5 border border-white/10 px-2 py-1.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                    <Download size={18} /> Download High-Res
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ResumeCard() {
  return <ScientificCVCard />;
}

// Custom Entrance Animation for CV
export function Resume() {
  return (
    <section id="resume" className="py-24 relative bg-black/20 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Curriculum Vitae
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="h-1 w-20 bg-secondary rounded-full mb-6 mx-auto origin-center"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Explore my academic background, laboratory experience, projects, skills, and professional experience through my complete CV.
          </motion.p>
        </div>
        
        <ResumeCard />
      </div>
    </section>
  );
}
