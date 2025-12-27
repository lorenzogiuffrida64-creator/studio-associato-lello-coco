
import React from 'react';
import { View } from '../App';

interface FooterProps {
  onNavigate: (view: View, anchor?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[32px] md:rounded-[40px] lg:rounded-[50px] p-8 md:p-16 lg:p-24 text-center mb-12 md:mb-20 lg:mb-24 overflow-hidden relative">
          {/* Background Beam Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-tight px-2">
              Pronto a mettere in <br /> <span className="inline-block italic opacity-60 pr-1 md:pr-2 pb-1 md:pb-2">ordine le tue tasse?</span>
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-white/50 max-w-xl px-4">
              Prenota oggi un incontro conoscitivo gratuito presso il nostro studio in centro a Catania.
            </p>
            <button
              onClick={() => onNavigate('home', '#contatti')}
              className="px-8 md:px-10 lg:px-12 py-3.5 md:py-4 lg:py-5 bg-white text-black rounded-2xl md:rounded-3xl font-bold text-base md:text-lg lg:text-xl hover:scale-105 transition-transform flex items-center gap-2 md:gap-3 group"
            >
              Contattaci Ora
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors text-sm md:text-base">
                →
              </div>
            </button>
          </div>
          
          {/* Subtle Decorative Background Shapes */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Google Map Section */}
        <div className="my-8 md:my-12 lg:my-16">
          <div className="glass rounded-[24px] md:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-white/10">
            <div className="p-6 md:p-10 lg:p-12">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-start md:items-center justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif mb-1.5 md:mb-2">Vieni a trovarci</h3>
                  <p className="text-white/50 text-sm md:text-base">Via Asiago, 38, 95127 Catania CT</p>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Via+Asiago+38+Catania+CT+Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 md:px-5 lg:px-6 py-2.5 md:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl md:rounded-2xl font-medium transition-all flex items-center gap-2 whitespace-nowrap text-sm md:text-base w-full md:w-auto justify-center"
                >
                  <span>Ottieni Indicazioni</span>
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-[20px] md:rounded-[24px] overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4079.3252384710836!2d15.100447776683403!3d37.51811867205125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313fcb7f9717479%3A0x7cfae67b4bca1b27!2sVia%20Asiago%2C%2038%2C%2095127%20Catania%20CT!5e1!3m2!1sit!2sit!4v1766841155845!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio Associato Location"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 md:pt-12 border-t border-white/10 gap-6 md:gap-8">
          <div className="flex flex-col gap-1.5 md:gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-serif text-2xl md:text-3xl italic">Giuliano Lello Coco</span>
            <span className="text-xs md:text-sm text-white/30">© 2025 Studio Associato. Tutti i diritti riservati.</span>
          </div>

          <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-3 md:gap-y-4 text-xs md:text-sm font-medium">
            <button onClick={() => onNavigate('about')} className="opacity-50 hover:opacity-100 transition-opacity">Chi Siamo</button>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">Termini di Servizio</a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">Linkedin</a>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/10">Catania • Via Asiago 38 • Italia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
