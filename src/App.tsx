import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/About';
import { About } from './components/About';
import { Services, Portfolio } from './components/Services';
import { Process, Impacts, Contact, Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAdminTrigger={() => setIsAdminOpen(true)} />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Impacts />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPortal 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
