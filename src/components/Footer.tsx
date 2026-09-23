import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary py-16 border-t border-white/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <blockquote className="text-xl md:text-2xl font-serif text-white/90 italic mb-8 max-w-2xl">
          &quot;Science begins with curiosity and grows through discovery.&quot;
        </blockquote>
        
        <div className="flex items-center gap-6 mb-12">
          <a href="https://github.com/barathan-s" target="_blank" rel="noreferrer" className="text-white/60 hover:text-accent transition-colors" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
          <a href="https://www.instagram.com/thanya_beats_official" target="_blank" rel="noreferrer" className="text-white/60 hover:text-accent transition-colors" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/barathan-s-8228a5295" target="_blank" rel="noreferrer" className="text-white/60 hover:text-accent transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:barathanbarathan746@gmail.com" className="text-white/60 hover:text-accent transition-colors" aria-label="Email">
            <Mail size={24} />
          </a>
        </div>
        
        <div className="w-24 h-[1px] bg-white/20 mb-8" />
        
        <p className="text-white/50 text-sm font-medium">
          &copy; {currentYear} S. Barathan. All rights reserved.
        </p>
        <p className="text-white/30 text-xs mt-2">
          M.Sc. Microbiology | Research Enthusiast
        </p>
      </div>
    </footer>
  );
}
