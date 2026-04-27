import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export const Navbar = ({ onAdminTrigger }: { onAdminTrigger: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newClicks = logoClicks + 1;
    if (newClicks >= 5) {
      onAdminTrigger();
      setLogoClicks(0);
    } else {
      setLogoClicks(newClicks);
      // Reset clicks after 2 seconds of inactivity
      const timer = setTimeout(() => setLogoClicks(0), 3000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
      isScrolled ? "glass-header py-4" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="flex flex-col group select-none"
        >
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-brand-blue flex items-center justify-center rounded-sm transition-transform group-hover:scale-110">
                <span className="text-white font-display font-black text-xl">X</span>
             </div>
             <span className="font-display font-black text-2xl tracking-tighter text-brand-ink uppercase">
               Scale X
             </span>
          </div>
          <span className="text-[10px] font-bold text-brand-muted mt-0.5 tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
            {BRAND.legal}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-blue transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-blue transition-all group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#contact" 
            className="flex items-center gap-2 bg-brand-ink text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg shadow-brand-ink/10"
          >
            Request Alignment <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-ink p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="md:hidden fixed inset-0 z-[110] bg-white overflow-hidden flex flex-col"
          >
            <div className="px-6 py-8 flex justify-between items-center border-b border-slate-50">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-brand-blue flex items-center justify-center rounded-sm">
                    <span className="text-white font-display font-black text-xl">X</span>
                 </div>
                 <span className="font-display font-black text-xl tracking-tighter text-brand-ink uppercase">
                   Scale X
                 </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-slate-50 rounded-full text-brand-ink"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow px-6 py-12 flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display font-bold text-brand-ink py-4 flex justify-between items-center group active:text-brand-blue"
                >
                  {link.name}
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-active:bg-brand-blue group-active:text-white transition-all">
                    <ArrowRight size={24} />
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="p-6 mt-auto bg-slate-50 mobile-safe-bottom">
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-brand-blue text-white py-6 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20"
              >
                Initiate Strategic Alignment <ArrowRight size={20} />
              </a>
              <div className="mt-8 pt-6 border-t border-slate-200/50 flex justify-between items-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    {BRAND.legal}
                 </p>
                 <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
