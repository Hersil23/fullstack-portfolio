/**
 * @fileoverview Página principal del portfolio
 * @description Landing page con todas las secciones del portfolio
 * @author Herasi Silva
 * @version 1.1.0
 */

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import CursorGlow from "@/components/ui/CursorGlow";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <CursorGlow />
        <Projects />
        <Services />
        
        {/* Placeholder para las siguientes secciones */}
        <section id="about" className="min-h-screen bg-bg-secondary flex items-center justify-center">
          <h2 className="text-4xl font-bold text-text-primary">About</h2>
        </section>

        <section id="tech-stack" className="min-h-screen bg-bg-primary flex items-center justify-center">
          <h2 className="text-4xl font-bold text-text-primary">Tech Stack</h2>
        </section>

        <section id="projects" className="min-h-screen bg-bg-secondary flex items-center justify-center">
          <h2 className="text-4xl font-bold text-text-primary">Projects</h2>
        </section>

        <section id="services" className="min-h-screen bg-bg-primary flex items-center justify-center">
          <h2 className="text-4xl font-bold text-text-primary">Services</h2>
        </section>

        <section id="contact" className="min-h-screen bg-bg-secondary flex items-center justify-center">
          <h2 className="text-4xl font-bold text-text-primary">Contact</h2>
        </section>
      </main>
    </>
  );
}