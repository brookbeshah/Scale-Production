import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Loader2, Send } from 'lucide-react';
import { PROCESS_STEPS, CONTACT_INFO, BRAND, CASE_STUDIES } from '@/src/constants';
import { SectionContainer, SectionHeading } from './Layout';
import { cn } from '@/src/lib/utils';

export const Process = () => (
  <SectionContainer id="process" className="bg-brand-ink text-white relative">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 skew-x-[-15deg] translate-x-[20%]" />
    
    <div className="relative z-10">
      <SectionHeading 
        subtitle="Our Deployment Process"
        title="Success is the outcome of intentional steps."
        description="We follow a rigorous framework to ensure excellence at every stage of institutional production."
        className="[&>span]:text-brand-blue/80 [&>h2]:text-white [&>p]:text-white/40"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {PROCESS_STEPS.map((step, idx) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="group"
          >
            <div className="flex items-end gap-2 mb-8">
              <span className="text-6xl font-display font-black text-white/5 group-hover:text-brand-blue/20 transition-colors leading-[0.8]">
                {step.id}
              </span>
              <div className="h-[2px] w-12 bg-white/10 group-hover:bg-brand-blue/30 transition-colors mb-2" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
            <p className="text-white/40 font-medium leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionContainer>
);

export const Impacts = () => (
  <SectionContainer id="impact" className="bg-white">
    <SectionHeading 
      subtitle="Quantifiable Impacts"
      title="Strategic results trusted by global leaders."
      centered
    />
    
    <div className="grid lg:grid-cols-2 gap-12">
      {CASE_STUDIES.map((study, idx) => (
        <motion.div 
          key={study.client}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
          className="bg-slate-50 rounded-3xl p-10 md:p-16 border border-slate-100 flex flex-col gap-10 strategic-card hover:bg-white"
        >
          <div>
             <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Institutional Case 0{idx + 1}</span>
             <h3 className="text-4xl font-display font-bold text-brand-ink">{study.client}</h3>
          </div>
          
          <div className="space-y-10">
            <div>
              <p className="text-xs font-black uppercase text-brand-ink tracking-widest mb-3">Objective</p>
              <p className="text-brand-muted text-lg font-medium">{study.objective}</p>
            </div>
            <div className="pt-10 border-t border-slate-200">
               <p className="text-xs font-black uppercase text-brand-blue tracking-widest mb-4">Strategic Outcome</p>
               <p className="text-2xl font-display font-bold text-brand-ink leading-tight">
                 {study.outcome}
               </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionContainer>
);

export const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('idle');
        alert('Strategic alignment failed. Please try again.');
      }
    } catch (err) {
      setFormStatus('idle');
      alert('Connection to alignment server lost.');
    }
  };

  return (
    <SectionContainer id="contact" className="bg-white">
      <div className="bg-brand-ink rounded-[2.5rem] overflow-hidden grid lg:grid-cols-5 border border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-transparent" />
        
        <div className="lg:col-span-2 p-12 md:p-20 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative">
          <div className="relative z-10">
            <h2 className="text-5xl font-display font-bold mb-10 leading-[1.05]">
              Let's Discuss Your <br />
              <span className="text-brand-blue">Project.</span>
            </h2>
            <p className="text-white/40 text-xl font-medium mb-16 leading-relaxed">
              Establish high-level communication with our team to start your strategic production journey.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-blue">
                  <Mail size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">Corporate Email</p>
                   <p className="text-lg font-bold">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-blue shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">Institutional Lines</p>
                   {CONTACT_INFO.phones.map(p => <p key={p} className="text-lg font-bold">{p}</p>)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 relative z-10 uppercase font-black text-[10px] tracking-[0.4em] text-white/20">
            {BRAND.est}
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] -translate-x-1/2" />
        </div>

        <div className="lg:col-span-3 p-12 md:p-20 bg-white/5 backdrop-blur-sm relative z-10">
          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-display font-bold text-white">Project Alignment Confirmed</h3>
                <p className="text-white/50 text-xl font-medium max-w-sm">
                  Our strategic department will evaluate your inquiry and reach out within 24 business hours.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-brand-blue font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                >
                  Initiate Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">First Name</label>
                    <input name="firstName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white outline-none focus:border-brand-blue transition-colors font-medium" placeholder="Ex: Ephrem" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">Last Name</label>
                    <input name="lastName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white outline-none focus:border-brand-blue transition-colors font-medium" placeholder="Ex: Tilahun" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">Corporate Email</label>
                  <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white outline-none focus:border-brand-blue transition-colors font-medium" placeholder="institutional@alignment.com" />
                </div>
                <div className="space-y-3 flex-grow">
                  <label className="text-[10px] font-black uppercase text-white/40 tracking-widest">Project Narrative</label>
                  <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white outline-none focus:border-brand-blue transition-colors font-medium resize-none shadow-inner" placeholder="Briefly summarize your institutional requirements..." />
                </div>
                <button 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-brand-blue text-white py-6 rounded-xl font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-4 transition-all hover:bg-brand-vivid hover:shadow-[0_20px_40px_-10px_rgba(0,82,255,0.4)] disabled:opacity-50"
                >
                  {formStatus === 'loading' ? (
                    <>Aligning Resources <Loader2 className="animate-spin" size={24} /></>
                  ) : (
                    <>Initiate Consultation <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionContainer>
  );
};

export const Footer = () => (
  <footer className="pt-32 pb-16 bg-white border-t border-slate-50">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
        <div className="max-w-sm">
           <div className="flex items-center gap-3 mb-8">
             <div className="w-12 h-12 bg-brand-ink flex items-center justify-center rounded-xl shadow-xl shadow-brand-ink/20">
                <span className="text-white font-display font-black text-2xl">X</span>
             </div>
             <span className="font-display font-black text-2xl tracking-tighter text-brand-ink uppercase">
               Scale X
             </span>
          </div>
          <p className="text-brand-muted text-lg font-medium leading-relaxed mb-8">
            Visual infrastructure for institutions that demand professional-gradeストーリーテリング and precision.
          </p>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Licensed Partner: {BRAND.legal}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase text-brand-ink tracking-[0.2em]">Platform</p>
            <nav className="flex flex-col gap-4">
              <a href="#about" className="text-brand-muted font-bold hover:text-brand-blue transition-colors">Strategic Profile</a>
              <a href="#services" className="text-brand-muted font-bold hover:text-brand-blue transition-colors">Institutional Services</a>
              <a href="#portfolio" className="text-brand-muted font-bold hover:text-brand-blue transition-colors">Deliverable Map</a>
            </nav>
          </div>
          <div className="space-y-6">
            <p className="text-xs font-black uppercase text-brand-ink tracking-[0.2em]">Contact</p>
            <nav className="flex flex-col gap-4">
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-brand-muted font-bold hover:text-brand-blue transition-colors">{CONTACT_INFO.email}</a>
              <a href="#" className="text-brand-muted font-bold hover:text-brand-blue transition-colors">Institutional HQ</a>
            </nav>
          </div>
          <div className="space-y-6 hidden sm:block">
            <p className="text-xs font-black uppercase text-brand-ink tracking-[0.2em]">Identity</p>
            <p className="text-[10px] font-black text-slate-300 uppercase leading-loose tracking-[0.2em]">
              {BRAND.est} <br />
              All Institutional Rights Reserved.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-brand-muted text-xs font-bold uppercase tracking-widest opacity-40">
          © 2026 {BRAND.name}. Strategic Asset.
        </p>
        <div className="flex gap-10">
           <a href="#" className="text-brand-muted text-xs font-bold uppercase tracking-widest hover:text-brand-ink transition-colors">Privacy Infrastructure</a>
           <a href="#" className="text-brand-muted text-xs font-bold uppercase tracking-widest hover:text-brand-ink transition-colors">Compliance Terms</a>
        </div>
      </div>
    </div>
  </footer>
);
