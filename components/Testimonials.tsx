
import React from 'react';
import { Star } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const reviews = [
  {
    client: "Etna Digital Solutions",
    name: "Marco Rosso",
    score: 4.9,
    text: "La precisione dello Studio Giuliano è fondamentale per la nostra crescita. Un partner affidabile in ogni sfida fiscale."
  },
  {
    client: "Catania con Gusto",
    name: "Joe Giuffrida",
    score: 5.0,
    text: "Hanno semplificato completamente la nostra gestione contabile. Finalmente dormiamo sonni tranquilli."
  },
  {
    client: "Sicily Tech",
    name: "Giuseppe Verdi",
    score: 4.8,
    text: "Consulenza di alto livello. La loro conoscenza del mercato locale e delle normative è impareggiabile."
  },
  {
    client: "Architettura & Design",
    name: "Laura Neri",
    score: 4.9,
    text: "Professionalità e disponibilità costanti. Si percepisce la passione per il loro lavoro."
  },
  {
    client: "Sapore di Mare",
    name: "Carmelo Esposito",
    score: 5.0,
    text: "Da quando ci affidiamo allo Studio Giuliano, abbiamo ottimizzato i costi fissi e migliorato la pianificazione finanziaria. Professionisti seri e preparati."
  },
  {
    client: "Luxury Suite Catania",
    name: "Alessia Russo",
    score: 4.7,
    text: "Gestire una struttura ricettiva richiede precisione. Lo studio ci segue con puntualità chirurgica, risolvendo ogni dubbio burocratico istantaneamente."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white/5 rounded-t-[60px] md:rounded-t-[100px] mt-20 relative overflow-hidden">
      {/* Elemento decorativo di sfondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              La fiducia dei nostri <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl italic">Clienti</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              La nostra missione è guidare il progresso delle imprese locali attraverso una consulenza fiscale d'eccellenza e trasparente.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <ScrollAnimation key={idx} direction="up" delay={idx * 0.1}>
            <div
              className="group bg-zinc-900/40 p-10 rounded-[40px] border border-white/5 transition-all duration-500 hover:-rotate-2 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-white/20 cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-xl text-purple-400 group-hover:text-purple-300 transition-colors duration-300">{rev.client}</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5 group-hover:border-white/10 transition-all duration-300">
                    <span className="text-sm font-bold text-white/80">{rev.score}</span>
                    <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  </div>
                </div>
                <p className="text-xl leading-relaxed text-white/60 mb-10 italic group-hover:text-white/90 transition-colors duration-500">
                  "{rev.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-serif text-lg">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white group-hover:text-purple-200 transition-colors duration-300">{rev.name}</p>
                  <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-semibold">Imprenditore locale</p>
                </div>
              </div>
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
