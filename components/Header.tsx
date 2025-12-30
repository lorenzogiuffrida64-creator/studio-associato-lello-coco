
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

type View = 'home' | 'about' | 'services';

interface HeaderProps {
  currentView?: View;
}

const Header: React.FC<HeaderProps> = ({ currentView: propCurrentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine current view from pathname
  const currentView = propCurrentView || (
    pathname === '/about' ? 'about' :
    pathname === '/services' ? 'services' :
    'home'
  );

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
    { name: 'Chi Siamo', href: '/about', view: 'about' as View },
    { name: 'Servizi', href: '/services', view: 'services' as View },
    { name: 'Testimonial', href: '/#testimonials', view: 'home' as View },
    { name: 'Contatti', href: '/#contatti', view: 'home' as View }
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 md:p-4 lg:p-6">
      <nav className={`glass rounded-[20px] md:rounded-[28px] lg:rounded-full w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 md:py-3 flex items-center justify-between md:justify-start gap-4 md:gap-8 lg:gap-12 border border-white/5 transition-all duration-500 ${isOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 md:gap-2 cursor-pointer group relative z-[70]"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png"
            alt="Studio Giuliano Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-500 group-hover:scale-110 flex-shrink-0 rounded-lg"
          />
          <span className="font-medium tracking-tight text-xs md:text-sm uppercase opacity-90 whitespace-nowrap">Studio Giuliano</span>
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`transition-opacity duration-300 relative group ${
                  currentView === item.view
                    ? 'opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                  currentView === item.view ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex ml-auto items-center gap-3">
          <Link
            href="/admin"
            className="text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full glass hover:bg-purple-500/20 transition-all duration-300 border border-purple-400/30 text-purple-300 hover:border-purple-400/50"
          >
            Area Soci
          </Link>
          <Link
            href="/#contatti"
            className="text-xs font-semibold uppercase tracking-widest px-6 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            Prenota Consulenza
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[70] p-1.5 md:p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </nav>
    </header>

      {/* Mobile Menu Overlay - Separate from header */}
      <div
        className={`fixed inset-0 bg-[#050505] z-[80] md:hidden flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="fixed top-0 left-0 right-0 z-[90] flex justify-between items-center p-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 cursor-pointer group"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png"
              alt="Studio Giuliano Logo"
              className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110 flex-shrink-0 rounded-lg"
            />
            <span className="font-medium tracking-tight text-xs uppercase opacity-90 whitespace-nowrap">Studio Giuliano</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Background Gradient for Mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black pointer-events-none"></div>

        {/* Menu Content */}
        <div className="flex-1 flex flex-col items-center justify-center pb-20">

          <ul className="flex flex-col items-center gap-6 sm:gap-8 text-center relative z-10 px-6">
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
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight uppercase hover:text-purple-400 transition-colors active:scale-95 ${
                    currentView === item.view ? 'text-purple-400' : 'text-white/90'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div
            style={{
              transitionDelay: isOpen ? '400ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0
            }}
            className="mt-12 sm:mt-16 relative z-10 transition-all duration-700 px-6 w-full max-w-sm flex flex-col gap-3"
          >
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 glass border border-purple-400/30 text-purple-300 rounded-2xl font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform hover:bg-purple-500/20"
            >
              Area Soci
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
            <Link
              href="/#contatti"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-2xl font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform"
            >
              Prenota Consulenza
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
          </div>

        </div>

        {/* Background Decorative Element for Mobile Menu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-md max-h-md bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </>
  );
};

export default Header;
