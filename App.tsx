import React from 'react';
import { SurveyForm } from './components/SurveyForm';

function App() {
  return (
    <div className="min-h-screen relative w-full flex flex-col font-sans text-slate-100 selection:bg-sky-500/30 overflow-hidden">
      
      {/* 1. Deep Space Background Gradient */}
      <div className="fixed inset-0 bg-[#020617] -z-50"></div>

      {/* 2. Active Nebula Blobs - Increased Opacity and Speed */}
      <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-sky-600/30 blur-[120px] rounded-full animate-blob mix-blend-screen"></div>
        <div className="absolute top-[40%] right-[-20%] w-[600px] h-[600px] bg-purple-600/30 blur-[120px] rounded-full animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-indigo-600/30 blur-[120px] rounded-full animate-blob animation-delay-4000 mix-blend-screen"></div>
      </div>

      {/* 3. Rising Particles (Dust Motes) - A lot of them for visibility */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
         {/* We create multiple particles with different delays and positions to create a continuous rising effect */}
         {Array.from({ length: 20 }).map((_, i) => (
           <div 
             key={i}
             className="absolute bg-white rounded-full opacity-0 animate-rise"
             style={{
               left: `${Math.random() * 100}%`,
               bottom: '-20px',
               width: `${Math.random() * 4 + 1}px`,
               height: `${Math.random() * 4 + 1}px`,
               opacity: Math.random() * 0.5 + 0.2, // Min 0.2 opacity
               animationDuration: `${Math.random() * 10 + 10}s`, // Between 10s and 20s
               animationDelay: `${Math.random() * 10}s`,
               boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.5)`
             }}
           />
         ))}
      </div>

      {/* 4. Shooting Stars & Twinkles */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute top-[10%] right-[0%] w-[300px] h-[2px] bg-gradient-to-l from-transparent via-sky-300 to-transparent animate-shooting-star opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] right-[10%] w-[200px] h-[2px] bg-gradient-to-l from-transparent via-white to-transparent animate-shooting-star opacity-70" style={{ animationDelay: '7s' }}></div>
        
        {/* Twinkling Stars */}
        <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-white rounded-full animate-twinkle shadow-[0_0_10px_white]"></div>
        <div className="absolute top-[25%] right-[25%] w-1.5 h-1.5 bg-sky-300 rounded-full animate-twinkle shadow-[0_0_10px_cyan]" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[30%] left-[5%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-2 h-2 bg-indigo-300 rounded-full animate-twinkle shadow-[0_0_10px_indigo]" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full flex items-center justify-center py-6 px-4 relative z-10">
        <SurveyForm />
      </main>

      {/* Footer */}
      <footer className="w-full text-center pb-6 pt-2 text-slate-500/80 text-[10px] uppercase tracking-widest relative z-10 font-medium">
        <p>Skyimmo Experience &bull; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;