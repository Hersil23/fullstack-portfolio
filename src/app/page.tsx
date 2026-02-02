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
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";



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
        <Contact />
        <Footer />
        
      </main>
    </>
  );
}