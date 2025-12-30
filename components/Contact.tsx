
'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, MapPin, Mail, Phone } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Send to Next.js API route (which then sends to Google Sheets)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Also save to localStorage as backup
      const existingSubmissions = JSON.parse(localStorage.getItem('studio_giuliano_contatti') || '[]');
      const newSubmission = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('studio_giuliano_contatti', JSON.stringify([...existingSubmissions, newSubmission]));

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Torna allo stato idle dopo 5 secondi
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">

          <ScrollAnimation direction="left" delay={0.1}>
          {/* Info Side */}
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-4 md:gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
                Parliamo della <br /> <span className="italic text-purple-400">tua strategia</span>
              </h2>
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-md">
                Siamo pronti ad ascoltare le tue esigenze e a costruire insieme un percorso fiscale solido e vantaggioso.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass flex items-center justify-center border-white/5 group-hover:border-purple-500/30 transition-all duration-300 flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-white/30 font-bold mb-1">Dove Siamo</p>
                  <p className="text-sm md:text-base text-white/80 font-medium">Via Asiago, 38, 95127 Catania CT</p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass flex items-center justify-center border-white/5 group-hover:border-purple-500/30 transition-all duration-300 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-white/30 font-bold mb-1">Email</p>
                  <p className="text-sm md:text-base text-white/80 font-medium break-all">studiocomgls@tiscali.it</p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass flex items-center justify-center border-white/5 group-hover:border-purple-500/30 transition-all duration-300 flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-white/30 font-bold mb-1">Telefono</p>
                  <p className="text-sm md:text-base text-white/80 font-medium">+39 095 444183</p>
                </div>
              </div>
            </div>
          </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.1}>
          {/* Form Side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/10 to-transparent blur-2xl md:blur-3xl opacity-50 rounded-full"></div>

            <div className="relative glass p-6 md:p-10 lg:p-12 rounded-[32px] md:rounded-[40px] lg:rounded-[48px] border-white/10 shadow-2xl">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Messaggio Inviato!</h3>
                  <p className="text-white/40 max-w-xs">
                    Grazie per averci contattato. Ti risponderemo entro le prossime 24 ore lavorative.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : status === 'error' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Errore di Invio</h3>
                  <p className="text-white/40 max-w-xs">
                    Si è verificato un problema. Per favore riprova o contattaci direttamente via email.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Riprova
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-white/30 ml-2">Nome Completo</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Mario Rossi"
                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10 text-sm md:text-base"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-white/30 ml-2">Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mario@esempio.it"
                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10 text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-white/30 ml-2">Oggetto</label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Consulenza Fiscale Impresa"
                      className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10 text-sm md:text-base"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-white/30 ml-2">Messaggio</label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Come possiamo aiutarti?"
                      className="bg-white/5 border border-white/10 rounded-[20px] md:rounded-[28px] px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10 resize-none text-sm md:text-base"
                    ></textarea>
                  </div>

                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="group mt-2 md:mt-4 relative w-full py-3.5 md:py-5 bg-white text-black rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 md:gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100 disabled:hover:shadow-none text-sm md:text-base"
                    style={{
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'submitting') {
                        e.currentTarget.style.boxShadow = '0 0 0 2px #a855f7, 0 0 20px rgba(168, 85, 247, 0.6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" />
                        <span>Invio in corso...</span>
                      </>
                    ) : (
                      <>
                        <span>Invia Messaggio</span>
                        <Send className="w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact;
