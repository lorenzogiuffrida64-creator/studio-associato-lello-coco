
import React, { useEffect } from 'react';
import { Target, Award, Heart, BookOpen } from 'lucide-react';

const partners = [
  {
    name: "Dott. Giuseppe Giuliano",
    role: "Fondatore & Senior Partner",
    specialization: "Diritto Tributario",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Dott.ssa Laura Lello",
    role: "Senior Partner",
    specialization: "Revisione Legale",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Dott. Marco Coco",
    role: "Partner",
    specialization: "Consulenza Societaria",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
  }
];

const values = [
  {
    icon: Award,
    title: "Eccellenza",
    text: "Non ci accontentiamo del protocollo. Cerchiamo la soluzione ottimale per ogni caso specifico."
  },
  {
    icon: Heart,
    title: "Integrità",
    text: "La trasparenza è il pilastro del nostro rapporto con i clienti e con le istituzioni."
  },
  {
    icon: BookOpen,
    title: "Aggiornamento",
    text: "In un panorama fiscale fluido, la formazione continua è il nostro unico punto fermo."
  }
];

const About: React.FC = () => {
  // Assicura che la pagina inizi dall'alto quando montata
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-20 lg:py-32 px-6 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 aspect-[4/5] lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
                alt="Studio Interno" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl border-white/10 z-20 hidden md:block animate-float">
              <p className="text-4xl font-serif text-purple-400 mb-1">25+</p>
              <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Anni di Esperienza</p>
            </div>
          </div>

          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-purple-400 text-sm font-bold uppercase tracking-[0.3em]">
              <span className="w-12 h-[1px] bg-purple-400/30"></span>
              La Nostra Storia
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Radici a <span className="italic">Catania</span>,<br />visione nazionale.
            </h2>
            <p className="text-white/50 text-xl leading-relaxed">
              Fondato oltre vent'anni fa, lo Studio Associato Giuliano Lello Coco nasce dalla volontà di offrire un porto sicuro alle imprese del territorio siciliano. 
              Non siamo solo commercialisti; siamo consulenti strategici che comprendono le sfide del fare impresa oggi.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              {values.map((val, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <val.icon className="w-6 h-6 text-purple-400/60" />
                  <h4 className="font-bold text-white/90">{val.title}</h4>
                  <p className="text-sm text-white/30">{val.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-6xl font-serif mb-6">I Professionisti</h3>
          <p className="text-white/40 max-w-xl mx-auto">
            Un team multidisciplinare pronto ad affrontare ogni complessità del sistema tributario italiano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {partners.map((partner, idx) => (
            <div key={idx} className="group relative">
              <div className="relative h-[450px] rounded-[40px] overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-500 group-hover:border-purple-500/30">
                <img 
                  src={partner.img} 
                  alt={partner.name} 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500">
                  <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold mb-2">{partner.role}</p>
                  <h4 className="text-2xl font-serif text-white mb-2">{partner.name}</h4>
                  <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-sm text-white/60">Spec: {partner.specialization}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
