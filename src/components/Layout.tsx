import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading = ({ 
  subtitle, 
  title, 
  description, 
  centered = false,
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-16",
      centered && "text-center mx-auto max-w-3xl",
      className
    )}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-ink mb-6 text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-brand-muted text-lg md:text-xl font-medium leading-relaxed text-balance"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export const SectionContainer = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("py-24 md:py-32 overflow-hidden", className)}>
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      {children}
    </div>
  </section>
);
