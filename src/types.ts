import { ReactNode } from 'react';

export interface Partner {
  name: string;
  category: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  title: string;
  category: string;
  impact: string;
  description: string;
}

export interface CaseStudy {
  title: string;
  objective: string;
  execution: string;
  outcome: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}
