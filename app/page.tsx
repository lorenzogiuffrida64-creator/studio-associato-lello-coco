'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackgroundEffects from '@/components/BackgroundEffects';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <BackgroundEffects mousePos={mousePos} />

      <div className="relative z-10">
        <Header currentView="home" />

        <main>
          <Hero />
          <div id="servizi">
            <Benefits />
          </div>
          <div id="testimonials">
            <Testimonials />
          </div>
          <div id="contatti">
            <Contact />
          </div>
        </main>

        <Footer />
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`
        }}
      />
    </div>
  );
}
