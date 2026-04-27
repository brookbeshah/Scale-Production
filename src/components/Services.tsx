import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Megaphone, Presentation, Globe, ArrowUpRight, X, ArrowRight } from 'lucide-react';
import { SERVICES, STRATEGIC_WORKS } from '@/src/constants';
import { SectionContainer, SectionHeading } from './Layout';
import { cn } from '@/src/lib/utils';

const IconMap: Record<string, any> = {
  Video,
  Megaphone,
  Presentation,
  Globe
};

export const Services = () => {
  const [activeService, setActiveService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <SectionContainer id="services" className="bg-slate-50">
      <SectionHeading 
        subtitle="Institutional Grade Services"
        title="Solutions designed for the professional standard."
        description="We provide the visual infrastructure that supports your institutional visibility through high-end production."
        centered
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, idx) => {
          const Icon = IconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveService(service)}
              className="strategic-card p-10 cursor-pointer group flex flex-col items-start"
            >
              <div className="w-14 h-14 bg-brand-blue/5 text-brand-blue flex items-center justify-center rounded-xl mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-ink mb-4 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-ink group-hover:gap-4 transition-all duration-300">
                Analyze Approach <ArrowRight size={14} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-ink/90 backdrop-blur-xl"
            onClick={() => setActiveService(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveService(null)}
                className="absolute top-6 right-6 p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue flex items-center justify-center rounded-2xl">
                  {React.createElement(IconMap[activeService.icon], { size: 36 })}
                </div>
                <div>
                   <p className="text-brand-blue font-bold text-xs uppercase tracking-widest mb-1">Service Strategy</p>
                   <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-ink">{activeService.title}</h3>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Professional Standard</p>
                  <p className="text-xl text-brand-ink font-medium leading-relaxed">
                    {activeService.extendedDetails}
                  </p>
                </div>
                <div className="pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveService(null)}
                    className="w-full bg-brand-ink text-white py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-blue transition-colors flex items-center justify-center gap-3"
                  >
                    Confirm & Discuss <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              
              {/* Background Accent */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-blue/5 rounded-full pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};

export const Portfolio = () => {
  const tabs = ['All', 'Real Estate', 'Government', 'Corporate', 'International'];
  const [activeTab, setActiveTab] = useState('All');

  const filteredWorks = activeTab === 'All' 
    ? STRATEGIC_WORKS 
    : STRATEGIC_WORKS.filter(w => w.category === activeTab || (activeTab === 'International' && w.category === 'International Organization'));

  return (
    <SectionContainer id="portfolio">
      <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
        <div className="max-w-2xl">
          <SectionHeading 
            subtitle="Strategic Works"
            title="Institutional Outcomes & Factual Deliverables."
            className="mb-0"
          />
        </div>
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300",
                activeTab === tab ? "bg-white text-brand-blue shadow-sm" : "text-slate-500 hover:text-brand-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <AnimatePresence mode="wait">
          {filteredWorks.map((work, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key={work.title}
              transition={{ duration: 0.4 }}
              className="strategic-card group overflow-hidden"
            >
              <div className="p-10 md:p-14 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 py-1.5 px-3 bg-slate-50 rounded-md">
                    {work.category}
                  </span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-brand-ink mb-6 group-hover:text-brand-blue transition-colors">
                  {work.title}
                </h3>
                
                <div className="relative flex-grow">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-brand-blue transition-colors" />
                  <div className="pl-8 flex flex-col gap-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Impact</p>
                    <p className="text-brand-muted text-xl font-medium leading-relaxed group-hover:text-brand-ink transition-colors">
                      {work.impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
};
