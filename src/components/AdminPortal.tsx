import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff, Loader2, Trash2, Calendar, User, Mail, MessageSquare } from 'lucide-react';
import { SectionHeading } from './Layout';

export const AdminPortal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Bek123') {
      setIsAuthenticated(true);
      fetchInquiries();
    } else {
      setError('Invalid Strategic Access Key');
    }
  };

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/inquiries', {
        headers: { 'Authorization': 'Bek123' }
      });
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.reverse());
      } else {
        setError('Failed to align data streams.');
      }
    } catch (err) {
      setError('Connection to strategic database failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-brand-ink/95 backdrop-blur-2xl overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 p-3 bg-white/5 text-white/50 hover:text-white rounded-full transition-all"
        >
          <X size={24} />
        </button>

        {!isAuthenticated ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-white p-12 rounded-[2rem] shadow-2xl"
            >
              <div className="text-center mb-10">
                 <div className="w-16 h-16 bg-brand-blue flex items-center justify-center rounded-2xl mx-auto mb-6 shadow-xl shadow-brand-blue/30">
                    <span className="text-white font-display font-black text-2xl">X</span>
                 </div>
                 <h2 className="text-3xl font-display font-bold text-brand-ink">Admin Alignment</h2>
                 <p className="text-slate-400 mt-2 font-medium">Verify strategic credentials.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Security Token</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      autoFocus
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-5 pr-14 text-brand-ink outline-none focus:border-brand-blue transition-colors font-bold tracking-widest"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-brand-blue transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-500 text-xs font-bold text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <button className="w-full bg-brand-ink text-white py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:bg-brand-blue shadow-lg active:scale-95">
                  Establish Connection
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div>
            <SectionHeading 
              subtitle="Strategic Intelligence"
              title="Global Inquiry Stream."
              description="Review potential institutional alignments and project narratives."
              className="[&>h2]:text-white [&>p]:text-white/40"
            />

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="animate-spin text-brand-blue" size={40} strokeWidth={3} />
                <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Syncing Data...</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <motion.div 
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-all group"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-10">
                        <div className="space-y-6 flex-grow">
                          <div className="flex flex-wrap gap-8">
                             <div className="flex items-center gap-3">
                                <User className="text-brand-blue" size={18} />
                                <span className="text-white font-bold">{inquiry.name}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <Mail className="text-brand-blue" size={18} />
                                <a href={`mailto:${inquiry.email}`} className="text-white/60 hover:text-brand-blue transition-colors font-medium">{inquiry.email}</a>
                             </div>
                             <div className="flex items-center gap-3 text-white/20">
                                <Calendar size={18} />
                                <span className="text-xs font-bold">{new Date(inquiry.timestamp).toLocaleString()}</span>
                             </div>
                          </div>
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                             <div className="flex items-start gap-4">
                                <MessageSquare className="text-brand-blue shrink-0 mt-1" size={18} />
                                <p className="text-white/80 leading-relaxed font-medium">
                                   {inquiry.message}
                                </p>
                             </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                           <button className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                             <Trash2 size={20} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
                    <p className="text-white/20 text-2xl font-display font-bold">No strategic entities detected in the current stream.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
