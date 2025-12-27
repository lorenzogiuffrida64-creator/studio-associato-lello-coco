
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';

export type View = 'home' | 'about';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Gestore della navigazione che assicura lo scroll corretto se torniamo in home
  const handleNavigate = (targetView: View, anchor?: string) => {
    setView(targetView);
    if (targetView === 'about' || !anchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (anchor) {
      // Piccolo timeout per permettere al DOM della Home di renderizzarsi prima dello scroll
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <BackgroundEffects mousePos={mousePos} />
      
      <div className="relative z-10">
        <Header currentView={view} onNavigate={handleNavigate} />
        
        <main>
          {view === 'home' ? (
            <>
              <Hero />
              <div id="benefits">
                <Benefits />
              </div>
              <div id="testimonials">
                <Testimonials />
              </div>
              <div id="contatti">
                <Contact />
              </div>
            </>
          ) : (
            <div className="pt-20"> {/* Padding extra per compensare l'header fisso */}
              <About />
            </div>
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Glow del cursore */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] z-0 transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)` 
        }}
      />
    </div>
  );
};

export default App;
