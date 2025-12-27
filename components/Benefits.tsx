
import React from 'react';
import { Calculator, ShieldCheck, FileText, TrendingUp, Users } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const benefits = [
  {
    icon: Calculator,
    title: "Dottori Commercialisti",
    description: "Professionisti iscritti all'Albo dei Dottori Commercialisti per la gestione completa della contabilità aziendale e degli adempimenti fiscali."
  },
  {
    icon: ShieldCheck,
    title: "Revisori Legali",
    description: "Servizi di revisione legale dei conti e certificazione dei bilanci, garantendo conformità normativa e trasparenza contabile."
  },
  {
    icon: FileText,
    title: "Consulenza Contabile",
    description: "Gestione della contabilità ordinaria e semplificata, redazione bilanci, analisi di bilancio e supporto nelle scelte gestionali."
  },
  {
    icon: TrendingUp,
    title: "Consulenza Fiscale",
    description: "Pianificazione fiscale, dichiarazioni dei redditi, assistenza in caso di verifiche e accertamenti fiscali per persone fisiche e giuridiche."
  },
  {
    icon: Users,
    title: "Consulenza Tributaria",
    description: "Ottimizzazione del carico tributario, gestione del contenzioso tributario e assistenza nelle operazioni straordinarie d'impresa."
  }
];

const Benefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-12 md:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 md:mb-6">
              I Nostri <br /> <span className="italic text-white/60">Servizi Professionali</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base px-4">
              Studio di consulenza contabile, fiscale e tributaria con professionisti qualificati al servizio delle imprese e dei privati.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, idx) => (
            <ScrollAnimation key={idx} direction="up" delay={idx * 0.1}>
            <div
              className={`glass p-6 md:p-8 lg:p-10 rounded-[24px] md:rounded-[32px] group transition-all duration-500 hover:-translate-y-2 hover:bg-white/5 border-white/5 hover:border-white/20 ${idx === 3 ? 'lg:col-span-1.5' : ''}`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-purple-500/20 transition-colors duration-500">
                <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-purple-300 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{benefit.title}</h3>
              <p className="text-sm md:text-base text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                {benefit.description}
              </p>
            </div>
            </ScrollAnimation>
          ))}

          <ScrollAnimation direction="up" delay={benefits.length * 0.1}>
          {/* Unique Call-to-action card */}
          <div className="glass p-8 md:p-10 rounded-[24px] md:rounded-[32px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/20">
             <span className="text-xs md:text-sm font-medium mb-4 opacity-60">Ottieni più risultati con meno sforzi.</span>
             <button className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform text-sm md:text-base">
               Inizia Ora
             </button>
          </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
