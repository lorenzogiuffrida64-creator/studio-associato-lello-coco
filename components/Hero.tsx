
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Auto-play carousel with Ken Burns effect
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const getActiveIndex = () => {
    if (scrollY < 300) return 0;
    if (scrollY < 600) return 1;
    return 2;
  };

  const activeIndex = currentImageIndex;

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

        {/* Premium Image Container */}
        <div className="relative flex justify-center items-center z-10 perspective-1000">
          {/* Enhanced Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-indigo-600/20 to-pink-600/30 rounded-full blur-[140px] animate-pulse"></div>
          <div
            className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-[100px]"
            style={{
              animation: 'float 8s ease-in-out infinite',
              animationDelay: '1s'
            }}
          ></div>

          {/* Main Image Container with 3D Effect */}
          <div
            className="relative w-full max-w-[550px] aspect-[3/4] group"
            style={{
              transform: `perspective(1200px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-[56px] opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500"
              style={{
                animation: 'gradient-rotate 8s linear infinite'
              }}
            ></div>

            {/* Premium Glass Frame */}
            <div className="absolute -inset-3 glass rounded-[60px] border border-white/10 backdrop-blur-xl"
              style={{
                boxShadow: '0 0 80px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.05)'
              }}
            ></div>

            {/* Main Image Box with Effects */}
            <div className="relative h-full w-full rounded-[52px] overflow-hidden border-2 border-white/30 shadow-2xl bg-zinc-900"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(168, 85, 247, 0.4)'
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    activeIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                >
                  {/* Ken Burns Effect - Slow Zoom & Pan */}
                  <div className={`w-full h-full ${activeIndex === idx ? 'animate-ken-burns' : ''}`}>
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'contrast(1.1) saturate(1.2)',
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Film Grain Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                      backgroundSize: '200px 200px'
                    }}
                  ></div>

                  {/* Chromatic Aberration Effect */}
                  <div className="absolute inset-0 mix-blend-screen opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-red-500/10 translate-x-[2px]"></div>
                    <div className="absolute inset-0 bg-cyan-500/10 -translate-x-[2px]"></div>
                  </div>

                  {/* Vignette Effect */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)'
                    }}
                  ></div>

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>

                  {/* Light Leak Effect */}
                  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-400/20 to-transparent blur-3xl opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-400/15 to-transparent blur-3xl opacity-50"></div>

                  {/* Premium Label Card */}
                  <div className={`absolute bottom-6 left-6 right-6 glass p-6 rounded-[28px] border border-white/20 backdrop-blur-xl transition-all duration-700 ${
                    activeIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                    style={{
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400 font-bold mb-1.5 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                          {img.label}
                        </p>
                        <p className="text-white font-serif text-2xl">{img.location}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center">
                        <span className="text-purple-300 text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40 glass px-4 py-2 rounded-full border border-white/10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-500 rounded-full ${
                      activeIndex === idx
                        ? 'bg-white w-8 h-2'
                        : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-purple-400/30 rounded-tl-2xl pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-purple-400/30 rounded-br-2xl pointer-events-none"></div>
            </div>

            {/* Floating Reflection Effect */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-b from-purple-500/20 to-transparent blur-2xl"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        <span className="text-[9px] uppercase tracking-[0.4em]">Esplora lo Studio</span>
      </div>

      <style>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1) translateX(0) translateY(0);
          }
          100% {
            transform: scale(1.1) translateX(-3%) translateY(-2%);
          }
        }

        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;
