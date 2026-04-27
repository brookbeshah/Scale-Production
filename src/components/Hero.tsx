import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Layout, Camera, Video, TrendingUp } from 'lucide-react';
import { BRAND } from '@/src/constants';

const FloatingIcon = ({ Icon, className, delay }: { Icon: any, className: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      y: [0, -20, 0],
      scale: 1,
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className={`absolute text-brand-blue pointer-events-none ${className}`}
  >
    <Icon size={48} />
  </motion.div>
);

export const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <FloatingIcon Icon={Camera} className="top-[15%] left-[5%]" delay={0} />
        <FloatingIcon Icon={Video} className="top-[25%] right-[10%]" delay={2} />
        <FloatingIcon Icon={Layout} className="bottom-[20%] left-[8%]" delay={1} />
        <FloatingIcon Icon={TrendingUp} className="bottom-[25%] right-[15%]" delay={3} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-[-12deg] translate-x-[25%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-blue/10 rounded-full text-brand-blue font-bold text-xs mb-8 uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              Scale X Excellence
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-black text-brand-ink leading-[0.9] md:leading-[0.85] tracking-tighter mb-10 text-balance">
              Strategic <br />
              <span className="text-brand-blue">Production.</span>
            </h1>
            
            <p className="text-lg md:text-3xl text-brand-muted mb-12 leading-relaxed md:leading-tight max-w-2xl font-medium text-balance">
              {BRAND.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6">
              <a 
                href="#contact" 
                className="group relative bg-brand-blue text-white px-8 md:px-10 py-5 md:py-6 rounded-xl md:rounded-sm font-bold text-base md:text-lg flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-brand-blue/30 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 sm:active:scale-100"
              >
                <span className="relative z-10">Initiate Journey</span>
                <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-brand-vivid translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              
              <a 
                href="#portfolio" 
                className="group flex items-center justify-center gap-4 px-8 md:px-10 py-5 md:py-6 text-brand-ink font-bold text-base md:text-lg hover:text-brand-blue transition-colors active:scale-95 sm:active:scale-100"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue/5 transition-all">
                  <Play size={18} className="fill-current" />
                </div>
                Portal Profile
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center gap-6"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4 md:mb-0">
              Institutional Corporate Partner:
            </p>
            <p className="text-lg font-display font-bold text-brand-ink/60">
              {BRAND.legal}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
