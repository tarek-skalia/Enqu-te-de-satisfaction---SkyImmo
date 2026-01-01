import React from 'react';
import { SurveyForm } from './components/SurveyForm';

function App() {
  return (
    <div className="min-h-screen relative w-full flex items-center justify-center bg-[#f8fafc] overflow-hidden font-sans text-brand-black">
      
      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 -z-50">
        {/* Abstract Gradient Orbs - Refined for premium feel */}
        <div className="absolute top-[-25%] right-[-10%] w-[90vw] h-[90vw] bg-sky-100/60 rounded-full blur-[120px] animate-mesh mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[80vw] h-[80vw] bg-indigo-50/80 rounded-full blur-[140px] animate-mesh mix-blend-multiply opacity-60" style={{ animationDelay: '-10s', animationDuration: '30s' }}></div>
        
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* --- Main Layout --- */}
      <main className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        <SurveyForm />
      </main>

      {/* --- Footer --- */}
      <footer className="fixed bottom-4 md:bottom-6 w-full text-center">
        <p className="text-[10px] text-slate-400/80 uppercase tracking-[0.25em] font-semibold">
          Skyimmo Satisfaction &bull; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;