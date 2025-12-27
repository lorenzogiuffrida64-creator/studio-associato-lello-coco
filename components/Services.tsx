
import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, FileText, TrendingUp, Scale, Building2, Receipt, Users2, CheckCircle, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Calculator,
    title: "Dottori Commercialisti",
    tagline: "Esperienza e Professionalità Certificate",
    description: "Professionisti iscritti all'Albo dei Dottori Commercialisti e degli Esperti Contabili, offriamo un servizio completo di gestione contabile e fiscale per aziende di ogni dimensione.",
    features: [
      "Tenuta della contabilità ordinaria e semplificata",
      "Redazione e deposito bilanci d'esercizio",
      "Consulenza gestionale e controllo di gestione",
      "Pianificazione e budgeting aziendale",
      "Analisi degli indici di bilancio",
      "Supporto nelle decisioni strategiche aziendali"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Revisori Legali",
    tagline: "Certificazione e Conformità Normativa",
    description: "Servizi di revisione legale dei conti per garantire trasparenza, conformità normativa e affidabilità delle informazioni contabili della vostra azienda.",
    features: [
      "Revisione legale dei bilanci d'esercizio",
      "Certificazione dei bilanci consolidati",
      "Verifica della regolarità contabile",
      "Controllo interno e risk assessment",
      "Due diligence contabile e finanziaria",
      "Attestazioni e relazioni di certificazione"
    ],
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: FileText,
    title: "Consulenza Contabile",
    tagline: "Gestione Contabile Completa e Accurata",
    description: "Dalla contabilità quotidiana alla redazione del bilancio, gestiamo tutti gli aspetti contabili della vostra attività con precisione e professionalità.",
    features: [
      "Registrazione prima nota e scritture contabili",
      "Gestione ciclo attivo e passivo",
      "Riconciliazioni bancarie e gestionali",
      "Redazione situazioni contabili infrannuali",
      "Analisi scostamenti e reportistica personalizzata",
      "Consulenza su principi contabili nazionali e internazionali"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Consulenza Fiscale",
    tagline: "Ottimizzazione e Pianificazione Tributaria",
    description: "Pianificazione fiscale strategica e gestione di tutti gli adempimenti tributari per persone fisiche, professionisti e società.",
    features: [
      "Dichiarazioni dei redditi (persone fisiche e società)",
      "Modelli IVA periodici e annuali",
      "Pianificazione fiscale e tax planning",
      "Assistenza in verifiche e accertamenti",
      "Consulenza su agevolazioni e crediti d'imposta",
      "Interpelli e ruling fiscali"
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Scale,
    title: "Consulenza Tributaria",
    tagline: "Gestione del Contenzioso e Ottimizzazione",
    description: "Assistenza specializzata nella gestione del contenzioso tributario e nell'ottimizzazione del carico fiscale nel rispetto della normativa vigente.",
    features: [
      "Gestione contenziosi con Agenzia delle Entrate",
      "Ricorsi e reclami tributari",
      "Assistenza in commissioni tributarie",
      "Ravvedimento operoso e sanatorie fiscali",
      "Definizione agevolata delle controversie",
      "Consulenza su compliance tributaria"
    ],
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Building2,
    title: "Operazioni Straordinarie",
    tagline: "Supporto nelle Fasi di Crescita",
    description: "Assistenza completa nelle operazioni straordinarie d'impresa: fusioni, scissioni, conferimenti, trasformazioni societarie e riorganizzazioni aziendali.",
    features: [
      "Fusioni e scissioni societarie",
      "Conferimenti d'azienda e di partecipazioni",
      "Trasformazioni societarie",
      "Liquidazioni volontarie",
      "Passaggi generazionali d'impresa",
      "Consulenza su M&A e ristrutturazioni"
    ],
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: Receipt,
    title: "Gestione Paghe e Contributi",
    tagline: "Amministrazione del Personale",
    description: "Elaborazione cedolini, gestione adempimenti previdenziali e assistenziali, consulenza del lavoro per garantire la piena conformità normativa.",
    features: [
      "Elaborazione cedolini mensili",
      "Gestione assunzioni, proroghe e cessazioni",
      "Dichiarazioni fiscali e previdenziali",
      "Pratiche INPS, INAIL e fondi integrativi",
      "Consulenza contrattualistica del lavoro",
      "Gestione malattie, maternità e CIG"
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Users2,
    title: "Consulenza Societaria",
    tagline: "Costituzione e Gestione Società",
    description: "Assistenza nella costituzione di nuove società, gestione ordinaria e straordinaria, adempimenti civilistici e corporate governance.",
    features: [
      "Costituzione società (SRL, SPA, SAS, SNC)",
      "Redazione statuti e patti parasociali",
      "Gestione assemblee e verbali societari",
      "Modifiche statutarie e aumenti di capitale",
      "Consulenza su governance aziendale",
      "Supporto nelle decisioni strategiche"
    ],
    color: "from-cyan-500 to-blue-500"
  }
];

const Services: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen py-20 lg:py-32 px-6 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-indigo-900/5 to-transparent animate-gradient-shift"></div>

      {/* Grid Shimmer Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'shimmer 20s linear infinite'
        }}></div>
      </div>

      {/* Particle Drift Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-drift ${15 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Light Beam Texture */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>

      {/* Slow Parallax Abstract Shapes */}
      <div
        className="absolute top-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      <div
        className="absolute bottom-40 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px]"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 w-fit mb-8 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs font-medium text-purple-100/80 uppercase tracking-wider">I Nostri Servizi</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8">
            <span className="font-serif">Soluzioni</span> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">Professionali</span>
            <br />
            <span className="text-white/60">per ogni esigenza</span>
          </h1>

          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Dal dottore commercialista al revisore legale, dalla consulenza contabile a quella tributaria.
            <br />Un team di professionisti qualificati al servizio della tua impresa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative glass rounded-[40px] p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-700 hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedService(selectedService === idx ? null : idx)}
            >
              {/* Gradient Accent */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-[40px] blur-xl transition-opacity duration-700`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title & Tagline */}
                <div className="mb-6">
                  <h3 className="text-3xl font-serif mb-2 group-hover:text-purple-200 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm uppercase tracking-widest text-purple-400/60 font-bold">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features List */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    selectedService === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-4">
                      Cosa Include
                    </h4>
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand Indicator */}
                <button className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors">
                  <span>{selectedService === idx ? 'Mostra meno' : 'Scopri di più'}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      selectedService === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Background Beam Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">
              Hai bisogno di <span className="italic text-purple-400">consulenza?</span>
            </h2>
            <p className="text-xl text-white/50 mb-8 max-w-2xl mx-auto">
              Contattaci per una consulenza personalizzata. Il nostro team è pronto ad ascoltare le tue esigenze.
            </p>
            <button className="group px-10 py-5 bg-white text-black rounded-3xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              Prenota Consulenza Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Decorative Background */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-5%) translateY(-5%); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-50%) translateY(-50%); }
          100% { transform: translateX(0%) translateY(0%); }
        }

        @keyframes particle-drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Services;
