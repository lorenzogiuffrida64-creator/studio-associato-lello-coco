
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
