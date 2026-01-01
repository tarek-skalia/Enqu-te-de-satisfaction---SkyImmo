import React from 'react';
import * as Icons from 'lucide-react';

// --- Icons ---
export const Icon = ({ name, className, size = 20, strokeWidth }: { name: string; className?: string; size?: number; strokeWidth?: number }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} strokeWidth={strokeWidth} />;
};

// --- Glass Card Container ---
export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 ${className}`}>
    {children}
  </div>
);

// --- Keyboard Hint ---
export const KeyboardHint: React.FC<{ k: string }> = ({ k }) => (
  <span className="hidden md:inline-flex items-center justify-center w-5 h-5 ml-2 text-[10px] font-bold text-slate-400 border border-slate-200 rounded bg-slate-50 uppercase">
    {k}
  </span>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'option' | 'agent';
  selected?: boolean; 
  isLoading?: boolean;
  shortcut?: string; // Add shortcut prop
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  selected = false,
  className = '', 
  isLoading, 
  disabled,
  shortcut,
  ...props 
}) => {
  
  const base = "relative overflow-hidden transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none";

  // 1. Primary Action (Dark Button)
  if (variant === 'primary') {
    return (
      <button 
        className={`${base} w-full py-4 px-8 bg-brand-black text-white text-sm font-semibold uppercase tracking-widest hover:bg-brand-accent hover:shadow-lg hover:shadow-sky-500/20 rounded-xl active:scale-[0.98] group ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <Icon name="Loader2" className="animate-spin" size={16} />
              <span>Envoi...</span>
            </>
          ) : (
            <>
              {children}
              <Icon name="ArrowRight" className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
            </>
          )}
        </div>
      </button>
    );
  }

  // 2. Outline (Secondary)
  if (variant === 'outline') {
    return (
      <button 
        className={`${base} px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-black border border-slate-200 hover:border-slate-400 rounded-full flex items-center gap-2 bg-transparent hover:bg-white/50 ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  // 3. Option (The List Items) - Enhanced for Premium feel
  if (variant === 'option') {
    return (
      <button 
        className={`
          ${base} w-full p-4 md:p-5 text-left rounded-xl border flex items-center justify-between group
          ${selected 
            ? 'bg-brand-black text-white border-brand-black shadow-lg transform scale-[1.01] z-10' 
            : 'bg-white/50 border-slate-200 text-slate-600 hover:border-brand-accent hover:bg-white hover:text-brand-black hover:shadow-md'
          }
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        <span className="flex items-center">
          <span className={`text-sm md:text-base font-medium transition-colors ${selected ? 'text-white' : ''}`}>
            {children}
          </span>
        </span>
        
        <div className="flex items-center gap-3">
          {shortcut && !selected && <KeyboardHint k={shortcut} />}
          
          {/* Custom Checkbox UI */}
          <div className={`
            w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300
            ${selected 
              ? 'border-white bg-white scale-110' 
              : 'border-slate-300 group-hover:border-brand-accent'
            }
          `}>
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-brand-black animate-scale-in" />}
          </div>
        </div>
      </button>
    );
  }

  // 4. Agent Card
  if (variant === 'agent') {
    return (
      <button 
        className={`
          ${base} flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 h-full relative
          ${selected 
            ? 'bg-white border-brand-accent shadow-xl shadow-sky-100 ring-1 ring-brand-accent scale-105 z-10' 
            : 'bg-white/60 border-slate-100 hover:border-slate-300 hover:bg-white hover:shadow-lg text-slate-500 hover:text-slate-800'
          }
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {selected && (
          <div className="absolute top-2 right-2 text-brand-accent animate-scale-in">
            <Icon name="CheckCircle2" size={16} />
          </div>
        )}
        
        <div className={`
          relative w-14 h-14 md:w-16 md:h-16 mb-3 rounded-full overflow-hidden border-2 transition-all duration-300
          ${selected ? 'border-brand-accent shadow-md' : 'border-transparent grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100'}
        `}>
          {children} 
        </div>
        <div className="text-center w-full">
          {/* We render title/subtitle via props logic in parent or direct mapping here */}
        </div>
        {/* Render rest of children (name text) */}
        {/* We expect the text to be passed after the image in the implementation */}
      </button>
    );
  }

  return <button {...props}>{children}</button>;
};

// --- Textarea ---
export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 group-focus-within:text-brand-accent transition-colors">{label}</label>}
      <textarea
        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all resize-none text-slate-700 placeholder-slate-400 text-sm leading-relaxed"
        {...props}
      />
    </div>
  );
};

// --- Progress Bar (Slim) ---
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-slate-100 mt-auto">
      <div 
        className="h-full bg-brand-accent shadow-[0_0_10px_rgba(14,165,233,0.5)] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};