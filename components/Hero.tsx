
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=1000&auto=format&fit=crop",
    label: "Sede Principale",
    location: "Via Asiago 38, Catania"
  },
  {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2959210?q=80&w=1000&auto=format&fit=crop",
    label: "Consulenza Diretta",
    location: "Incontri Strategici"
  },
  {
    url: "https://images.unsplash.com/photo-1454165833767-027fffd16082?q=80&w=1000&auto=format&fit=crop",
    label: "Analisi Digitale",
    location: "Sistemi Cloud Avanzati"
  }
];

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getActiveIndex = () => {
    if (scrollY < 300) return 0;
    if (scrollY < 600) return 1;
    return 2;
  };

  const activeIndex = getActiveIndex();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div 
          className={`flex flex-col gap-8 z-20 transition-all duration-1000 ease-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-100/80">Disponibili per nuove consulenze</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[110px] leading-[1.1] font-serif tracking-tight">
            Semplifichiamo il tuo <br />
            <span className="inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-purple-400 pr-8 pb-4">
              futuro fiscale
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-lg leading-relaxed">
            Consulenza d'eccellenza a Catania. Studio Associato Giuliano Lello Coco: la tua bussola nel labirinto tributario per imprese e professionisti.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group relative px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-2 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="border-beam-active"></div>
              </div>
              <span className="relative z-10">Esplora i Servizi</span>
              <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button className="px-8 py-4 rounded-2xl border border-white/10 glass text-white font-bold transition-all hover:bg-white/5 hover:border-white/20">
              Il Nostro Metodo
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center z-10">
          {/* Sfondo luminoso accentuato */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-600/10 to-transparent rounded-full blur-[120px] animate-pulse"></div>
          
          {/* Forme Astratte con Immagini */}
          <div 
            className="absolute -top-12 -left-12 w-32 h-32 rounded-full overflow-hidden border border-white/20 z-30 animate-float shadow-2xl transition-transform duration-700 pointer-events-none"
            style={{ 
              transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.05}px) rotate(${scrollY * 0.1}deg)`,
              animationDelay: '1s'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=400&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-60"
              alt="Dettaglio ufficio"
            />
          </div>

          <div 
            className="absolute -bottom-16 -right-16 w-40 h-40 rounded-[40px] overflow-hidden border border-white/10 z-30 animate-float shadow-2xl transition-transform duration-700 pointer-events-none"
            style={{ 
              transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.03}px) rotate(${scrollY * -0.05}deg)`,
              animationDelay: '2.5s'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-40"
              alt="Firma legale"
            />
          </div>

          <div 
            className="absolute top-1/4 -right-20 w-24 h-24 rounded-full overflow-hidden border border-white/5 z-0 animate-float opacity-30 pointer-events-none"
            style={{ 
              transform: `translate(${scrollY * 0.08}px, ${scrollY * 0.02}px)`,
              animationDelay: '0.5s',
              animationDuration: '8s'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale"
              alt="Meeting"
            />
          </div>

          {/* Contenitore Immagini Principale */}
          <div className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-square min-h-[450px] animate-float">
            
            {/* Cornici decorative rotanti */}
            <div 
              className="absolute -inset-4 border border-white/10 rounded-[60px] rotate-6 pointer-events-none transition-transform duration-1000" 
              style={{ transform: `rotate(${6 + scrollY * 0.02}deg)` }}
            ></div>
            <div 
              className="absolute -inset-8 border border-white/5 rounded-[80px] -rotate-3 pointer-events-none transition-transform duration-1000" 
              style={{ transform: `rotate(${-3 - scrollY * 0.02}deg)` }}
            ></div>
            
            {/* Box Immagini Reale */}
            <div className="relative h-full w-full rounded-[48px] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900 transition-all duration-700">
              
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out z-0 ${
                    activeIndex === idx ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-110 pointer-events-none'
                  }`}
                >
                  <img 
                    src={img.url} 
                    alt={img.label} 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradiente per leggibilità label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                  
                  {/* Label dinamica */}
                  <div className={`absolute bottom-8 left-8 right-8 glass p-5 rounded-3xl border-white/10 transition-all duration-700 ${
                    activeIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold mb-1">{img.label}</p>
                    <p className="text-white font-serif italic text-xl">{img.location}</p>
                  </div>
                </div>
              ))}
              
              {/* Indicatori di navigazione laterali */}
              <div className="absolute top-1/2 -translate-y-1/2 right-6 flex flex-col gap-3 z-30">
                {images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-1 rounded-full transition-all duration-700 ${
                      activeIndex === idx ? 'bg-white h-8' : 'bg-white/20 h-2'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        <span className="text-[9px] uppercase tracking-[0.4em]">Esplora lo Studio</span>
      </div>
    </section>
  );
};

export default Hero;
