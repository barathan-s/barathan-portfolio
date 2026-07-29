"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../SectionHeader";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery() {
  const images = [
    { title: "", size: "col-span-1 row-span-2", src: "/images/gallery-3.jpg"  },
    { title: "", size: "col-span-1 md:col-span-2 row-span-2", src: "/images/gallery-1.jpg" },
    { title: "", size: "col-span-1 row-span-2", src: "/images/gallery-4.jpg"},
    { title: "", size: "col-span-1 md:col-span-2 row-span-1", src: "/images/gallery-2.jpg" },
    { title: "", size: "col-span-1 row-span-1", src: "/images/gallery-5.jpg" },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);
  
  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
  }, [images.length]);

  // Handle keyboard events
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, showNext, showPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          title="Gallery" 
          subtitle="Glimpses into my academic and research endeavors."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] max-w-6xl mx-auto mt-12">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedIndex(index)}
              className={`relative group overflow-hidden rounded-2xl glass-card border-none cursor-pointer ${img.size}`}
            >
              <div className="absolute inset-0 bg-primary/80 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h4 className="text-lg font-bold text-white">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 md:left-8 z-50 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all"
              onClick={showPrev}
              aria-label="Previous Image"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 md:right-8 z-50 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all"
              onClick={showNext}
              aria-label="Next Image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[90vw] h-[85vh] max-w-7xl mx-auto flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-8 left-0 right-0 text-center text-white/80 font-medium">
                {images[selectedIndex].title} ({selectedIndex + 1} / {images.length})
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
