
import React, { useState, useEffect } from 'react';
import { View } from '../App';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View, anchor?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevenzione dello scroll quando il menu è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Chi Siamo', view: 'about' as View, anchor: undefined },
    { name: 'Servizi', view: 'services' as View, anchor: undefined },
    { name: 'Testimonial', view: 'home' as View, anchor: '#testimonials' },
    { name: 'Contatti', view: 'home' as View, anchor: '#contatti' }
  ];

  const handleMobileNav = (view: View, anchor?: string) => {
    onNavigate(view, anchor);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
      <nav className={`glass rounded-[32px] md:rounded-full w-full max-w-7xl px-6 md:px-8 py-3 flex items-center justify-between md:justify-start gap-12 border border-white/5 transition-all duration-500`}>
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group z-[60]" 
          onClick={() => {
            onNavigate('home');
            setIsOpen(false);
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 transition-transform duration-500 group-hover:rotate-12"></div>
          <span className="font-medium tracking-tight text-sm uppercase opacity-90">Studio Giuliano</span>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <button 
                onClick={() => onNavigate(item.view, item.anchor)}
                className={`transition-opacity duration-300 relative group ${
                  (currentView === item.view && !item.anchor) 
                    ? 'opacity-100' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                  currentView === item.view && !item.anchor ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button 
          onClick={() => onNavigate('home', '#contatti')}
          className="hidden md:block ml-auto text-xs font-semibold uppercase tracking-widest px-6 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          Prenota Consulenza
        </button>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-[60] p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-[#050505] z-50 md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          {/* Background Gradient for Mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black pointer-events-none"></div>

          <ul className="flex flex-col items-center gap-8 text-center relative z-10">
            {navItems.map((item, idx) => (
              <li 
                key={item.name}
                style={{ 
                  transitionDelay: isOpen ? `${idx * 75}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isOpen ? 1 : 0
                }}
                className="transition-all duration-500"
              >
                <button 
                  onClick={() => handleMobileNav(item.view, item.anchor)}
                  className={`text-3xl font-medium tracking-tight uppercase hover:text-purple-400 transition-colors ${
                    currentView === item.view && !item.anchor ? 'text-purple-400' : 'text-white/90'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          
          <div 
            style={{ 
              transitionDelay: isOpen ? '400ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0
            }}
            className="mt-16 relative z-10 transition-all duration-700"
          >
            <button 
              onClick={() => handleMobileNav('home', '#contatti')}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-transform"
            >
              Prenota Consulenza
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Background Decorative Element for Mobile Menu */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-600/5 rounded-full blur-[120px] -z-10"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
