import React from 'react';
import * as Icons from 'lucide-react';

// --- Icons ---
export const Icon = ({ name, className, size = 24 }: { name: string; className?: string; size?: number }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} />;
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'option' | 'agent';
  selected?: boolean; 
  isLoading?: boolean;
  animatedBorder?: boolean; // New prop for the requested effect
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  selected = false,
  animatedBorder = false,
  className = '', 
  isLoading, 
  disabled,
  ...props 
}) => {
  
  // Special implementation for the "Moving Border" button
  if (animatedBorder) {
    return (
      <button 
        className={`relative inline-flex h-16 w-full overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 group ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0EA5E9_0%,#6366f1_50%,#0EA5E9_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-lg font-bold text-white backdrop-blur-3xl transition-colors hover:bg-slate-900/90">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Icon name="Loader2" className="animate-spin" size={20} />
              <span>Traitement...</span>
            </span>
          ) : children}
        </span>
      </button>
    );
  }

  const baseStyle = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  let variantStyles = "";
  
  if (variant === 'primary') {
    variantStyles = "px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-lg shadow-sky-500/30 text-lg font-bold w-full relative overflow-hidden";
  } else if (variant === 'ghost') {
    variantStyles = "px-4 py-2 text-slate-400 hover:text-white bg-transparent hover:bg-white/5 rounded-full";
  } else if (variant === 'option') {
    variantStyles = `
      p-5 text-sm md:text-base h-full w-full border rounded-2xl transition-all duration-300
      flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group
      ${selected 
        ? 'bg-sky-900/20 border-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.25)]' 
        : 'bg-[#111827]/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
      }
    `;
  } else if (variant === 'agent') {
    variantStyles = `
      p-3 h-full w-full border rounded-2xl transition-all duration-300
      flex flex-col items-center gap-3 relative group
      ${selected 
        ? 'bg-sky-900/20 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] scale-[1.02]' 
        : 'bg-[#111827]/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
      }
    `;
  }

  return (
    <button 
      className={`${baseStyle} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {selected && variant === 'option' && (
        <div className="absolute inset-0 bg-sky-400/5 blur-xl"></div>
      )}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Icon name="Loader2" className="animate-spin" size={20} />
          <span>Envoi...</span>
        </span>
      ) : children}
    </button>
  );
};

// --- Textarea ---
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-semibold text-white mb-2 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur"></div>
        <textarea
          className="relative w-full p-4 rounded-xl border border-slate-700 bg-[#0f172a] text-white focus:border-sky-500 focus:bg-[#162032] outline-none transition-all h-32 resize-none placeholder-slate-500 font-medium text-sm"
          {...props}
        />
      </div>
    </div>
  );
};

// --- Progress Bar ---
export const StickyProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-900">
      <div 
        className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(14,165,233,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};