/**
 * @fileoverview Página principal del portfolio
 * @description Renderiza todas las secciones del portfolio
 * @author Herasi Silva
 * @version 1.0.0
 */

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

/**
 * Página de inicio del portfolio
 * @description Compone todas las secciones en orden
 * @returns {JSX.Element} Página completa del portfolio
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <p className="text-accent font-bold text-xl">Herasi.dev</p>
        </div>
      </nav>

      {/* Hero Section - Temporal */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-accent mb-2">Hola, soy</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Herasi Silva</h1>
          <p className="text-2xl md:text-3xl text-text-secondary mb-8">
            Full Stack Developer
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-accent-light transition-colors">
              Ver Proyectos
            </button>
            <button className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors">
              Descargar CV
            </button>
          </div>
        </div>
      </section>

      {/* Placeholder de secciones */}
      <section id="about" className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Sobre Mí</h2>
          <p className="text-text-secondary">Sección en construcción...</p>
        </div>
      </section>

      <section id="tech-stack" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Tecnologías</h2>
          <p className="text-text-secondary">Sección en construcción...</p>
        </div>
      </section>

      <section id="projects" className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Proyectos</h2>
          <p className="text-text-secondary">Sección en construcción...</p>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Servicios</h2>
          <p className="text-text-secondary">Sección en construcción...</p>
        </div>
      </section>

      <section id="contact" className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
          <p className="text-text-secondary">Sección en construcción...</p>
        </div>
      </section>

      {/* Footer temporal */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-text-secondary">
          <p>© 2026 Herasi Silva. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}