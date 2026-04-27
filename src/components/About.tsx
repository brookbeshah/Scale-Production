import React from 'react';
import { motion } from 'motion/react';
import { CLIENTS, ACHIEVEMENTS, BRAND } from '@/src/constants';
import { CheckCircle2 } from 'lucide-react';
import { SectionContainer } from './Layout';

export const TrustBar = () => {
  const combinedClients = [...CLIENTS, ...CLIENTS];
  const combinedAchievements = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

  return (
    <section className="py-20 bg-white border-y border-slate-50 overflow-hidden pause-marquee">
      <div className="mb-16">
        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.44em] mb-12">
          Strategic Clients & Global Partnerships
        </p>
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex items-center gap-20 md:gap-40 whitespace-nowrap min-w-max pr-40">
            {combinedClients.map((client, idx) => (
              <div key={idx} className="flex flex-col items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default">
                <span className="text-brand-ink font-display font-black text-3xl leading-none uppercase tracking-tighter">
                  {client.name}
                </span>
                <span className="text-[10px] font-bold text-brand-blue tracking-[0.2em] uppercase mt-1">
                  {client.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.44em] mb-8">
          Market Performance & Deliverables
        </p>
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-12 md:gap-24 whitespace-nowrap min-w-max pr-24">
            {combinedAchievements.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-default">
                <CheckCircle2 className="text-brand-blue/30 group-hover:text-brand-blue group-hover:scale-110 transition-all duration-300" size={18} />
                <span className="text-lg md:text-xl font-display font-bold text-brand-muted group-hover:text-brand-ink transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <SectionContainer id="about" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 lg:order-1"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 relative group">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" 
              alt="Institutional Focus"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-ink/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-56 md:w-72 p-6 md:p-10 bg-brand-blue rounded-2xl md:rounded-3xl shadow-2xl text-white"
          >
            <p className="text-3xl md:text-5xl font-display font-black mb-1 md:mb-2 leading-none">100%</p>
            <p className="text-white/80 font-bold text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
              Precision Delivery in Institutional Visibility
            </p>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Our Institutional Context</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-ink mb-10 leading-[1.05] tracking-tight">
            A Structured Approach to <br className="hidden md:block" />
            <span className="text-brand-blue">Production.</span>
          </h2>
          
          <div className="space-y-6 md:space-y-8 text-brand-muted text-lg md:text-xl font-medium leading-relaxed mb-12">
            <p>
              Scale X Production operates at the intersection of cinematic artistry and corporate pragmatism. We understand that institutional needs require more than just creativity; they demand reliability and precision.
            </p>
            <p>
              Our methodology is built on structured processes that ensure consistent high-quality output for demanding clients, from real estate developers to government bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            <div className="flex flex-col gap-4 p-8 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-blue transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-display font-bold text-brand-ink text-xl mb-2">Reliable Execution</p>
                <p className="text-sm font-medium text-slate-400">Every project delivered on-time and with high accuracy.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-8 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-blue transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-display font-bold text-brand-ink text-xl mb-2">Corporate Focus</p>
                <p className="text-sm font-medium text-slate-400">Tailored specifically for business and institutional growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
