import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalBackground } from "@/components/GlobalBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Internships } from "@/components/sections/Internships";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Achievements, Resume } from "@/components/sections/Achievements";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      <GlobalBackground />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Internships />
      <Projects />
      <Research />
      <Achievements />
      <Resume />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
