
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, MapPin, Mail, Phone } from 'lucide-react';

// Google Apps Script Web App URL for form submissions
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqGUhI7yjuZYmXrU_0MtwNO7X5uUqxdQu-NcwCGuVYupIGFzvwqBBvoCabbXtJ7o8/exec';

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
      // Send to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

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
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Info Side */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl md:text-6xl font-serif">
                Parliamo della <br /> <span className="italic text-purple-400">tua strategia</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-md">
                Siamo pronti ad ascoltare le tue esigenze e a costruire insieme un percorso fiscale solido e vantaggioso.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/30 font-bold mb-1">Dove Siamo</p>
                  <p className="text-white/80 font-medium">Via Asiago, 38, 95127 Catania CT</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/30 font-bold mb-1">Email</p>
                  <p className="text-white/80 font-medium">studiocomgls@tiscali.it</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/30 font-bold mb-1">Telefono</p>
                  <p className="text-white/80 font-medium">+39 095 444183</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/10 to-transparent blur-3xl opacity-50 rounded-full"></div>
            
            <div className="relative glass p-8 md:p-12 rounded-[48px] border-white/10 shadow-2xl">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-2">Nome Completo</label>
                      <input 
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Mario Rossi"
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-2">Email</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mario@esempio.it"
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-2">Oggetto</label>
                    <input 
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Consulenza Fiscale Impresa"
                      className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-2">Messaggio</label>
                    <textarea 
                      required
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Come possiamo aiutarti?"
                      className="bg-white/5 border border-white/10 rounded-[28px] px-6 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all text-white placeholder:text-white/10 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === 'submitting'}
                    type="submit"
                    className="group mt-4 relative w-full py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Invio in corso...</span>
                      </>
                    ) : (
                      <>
                        <span>Invia Messaggio</span>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
