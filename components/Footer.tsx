
import React from 'react';
import { View } from '../App';

interface FooterProps {
  onNavigate: (view: View, anchor?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[50px] p-12 md:p-24 text-center mb-24 overflow-hidden relative">
          {/* Background Beam Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-5xl md:text-8xl font-serif leading-tight">
              Pronto a mettere in <br /> <span className="inline-block italic opacity-60 pr-2 pb-2">ordine le tue tasse?</span>
            </h2>
            <p className="text-xl text-white/50 max-w-xl">
              Prenota oggi un incontro conoscitivo gratuito presso il nostro studio in centro a Catania.
            </p>
            <button 
              onClick={() => onNavigate('home', '#contatti')}
              className="px-12 py-5 bg-white text-black rounded-3xl font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3 group"
            >
              Contattaci Ora
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                →
              </div>
            </button>
          </div>
          
          {/* Subtle Decorative Background Shapes */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Google Map Section */}
        <div className="my-16">
          <div className="glass rounded-[32px] overflow-hidden border border-white/10">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-2">Vieni a trovarci</h3>
                  <p className="text-white/50">Via Asiago, 38, 95127 Catania CT</p>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Via+Asiago+38+Catania+CT+Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-medium transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Ottieni Indicazioni</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.234567890123!2d15.0833333!3d37.5166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313fec1c1c1c1c1%3A0x1234567890abcdef!2sVia%20Asiago%2C%2038%2C%2095127%20Catania%20CT%2C%20Italy!5e0!3m2!1sen!2sit!4v1234567890123!5m2!1sen!2sit"
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-12 border-t border-white/10 gap-8">
          <div className="flex flex-col gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-serif text-3xl italic">Giuliano Lello Coco</span>
            <span className="text-sm text-white/30">© 2024 Studio Associato. Tutti i diritti riservati.</span>
          </div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-medium">
            <button onClick={() => onNavigate('about')} className="opacity-50 hover:opacity-100 transition-opacity">Chi Siamo</button>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">Termini di Servizio</a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">Linkedin</a>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/10">Catania • Via Asiago 38 • Italia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
