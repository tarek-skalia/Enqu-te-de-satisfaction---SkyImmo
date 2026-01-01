import React, { useState, useEffect, useCallback } from 'react';
import { 
  SurveyData, 
  INITIAL_DATA, 
  AGENTS_LIST, 
  PUNCTUALITY_OPTIONS, 
  KNOWLEDGE_OPTIONS, 
  ACCOMPANIMENT_OPTIONS, 
  ATTITUDE_OPTIONS 
} from '../types';
import { Button, TextArea, Icon, ProgressBar, GlassCard, KeyboardHint } from './UI';
import { generateThankYouMessage } from '../services/geminiService';

export const SurveyForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [greeting, setGreeting] = useState("Bonjour");

  const TOTAL_STEPS = 7; 

  // --- Dynamic Greeting ---
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 18 || hours < 5) setGreeting("Bonsoir");
    else setGreeting("Bonjour");
  }, []);

  // --- Keyboard Navigation ---
  // We use useCallback to keep the listener stable
  const handleKeyOption = useCallback((e: KeyboardEvent) => {
    if (step < 2 || step > 5) return; // Only for option steps (2,3,4,5)
    
    // Map keys 1-4 to index 0-3
    const key = e.key;
    const index = parseInt(key) - 1;
    
    let currentOptions: any[] = [];
    let field: keyof SurveyData | null = null;

    if (step === 2) { currentOptions = PUNCTUALITY_OPTIONS; field = 'punctuality'; }
    else if (step === 3) { currentOptions = KNOWLEDGE_OPTIONS; field = 'knowledge'; }
    else if (step === 4) { currentOptions = ACCOMPANIMENT_OPTIONS; field = 'accompaniment'; }
    else if (step === 5) { currentOptions = ATTITUDE_OPTIONS; field = 'attitude'; }

    if (field && currentOptions[index]) {
      handleSelection(field, currentOptions[index].label);
    }
  }, [step]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyOption);
    return () => window.removeEventListener('keydown', handleKeyOption);
  }, [handleKeyOption]);


  // --- Handlers ---
  const handleSelection = (field: keyof SurveyData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Wait for animation
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 350); 
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // UX delay
    
    const agent = AGENTS_LIST.find(a => a.id === data.agentId);
    const agentName = agent ? agent.name : "Unknown";
    
    const finalData = { ...data, agentName };
    const message = await generateThankYouMessage(finalData);
    
    setAiResponse(message);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const goBack = () => setStep(prev => prev - 1);

  // --- Render Steps ---

  const IntroStep = () => (
    <div className="flex flex-col items-center text-center animate-fade-up px-2">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-sky-200 blur-2xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative w-20 h-20 bg-gradient-to-br from-brand-black to-slate-800 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 rotate-3">
          <Icon name="Building2" size={36} />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-2 tracking-tight">
        SKYIMMO
      </h1>
      <p className="text-brand-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-10">
        L'Excellence Immobilière
      </p>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{greeting}.</h2>
      <p className="text-slate-500 leading-relaxed text-sm max-w-sm mx-auto mb-10">
        Votre expérience est notre meilleure publicité. 
        Aidez-nous à maintenir notre standard d'excellence en quelques clics.
      </p>

      <div className="w-full max-w-xs">
        <Button onClick={() => setStep(1)}>
          Commencer l'expérience
        </Button>
      </div>
    </div>
  );

  const AgentStep = () => (
    <div className="w-full animate-scale-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-black mb-1">Votre Expert</h3>
        <p className="text-slate-400 text-sm">Sélectionnez la personne qui vous a accompagné.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 overflow-y-auto max-h-[50vh] md:max-h-none p-1">
        {AGENTS_LIST.map(agent => (
          <Button 
            key={agent.id}
            variant="agent" 
            selected={data.agentId === agent.id}
            onClick={() => handleSelection('agentId', agent.id)}
            className="w-full"
          >
             <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
             <div className="mt-2 w-full">
               <div className="font-bold text-xs md:text-sm leading-tight text-brand-black truncate">{agent.name}</div>
               <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold truncate">{agent.role}</div>
             </div>
          </Button>
        ))}
      </div>
    </div>
  );

  const QuestionStep = ({ 
    title, 
    subtitle, 
    options, 
    field 
  }: { 
    title: string; 
    subtitle: string; 
    options: {id: string, label: string}[]; 
    field: keyof SurveyData;
  }) => (
    <div className="w-full max-w-md mx-auto animate-fade-up">
       <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-black mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>
      
      <div className="flex flex-col gap-3">
        {options.map((opt, idx) => (
          <Button 
            key={opt.id}
            variant="option" 
            shortcut={`${idx + 1}`}
            selected={String(data[field]) === opt.label}
            onClick={() => handleSelection(field, opt.label)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-300">
        Appuyez sur <KeyboardHint k="1-4" /> pour sélectionner
      </p>
    </div>
  );

  const FinalStep = () => {
    // Determine emotion based on rating
    const getReaction = (rating: number) => {
        if (rating === 5) return "🤩";
        if (rating === 4) return "😊";
        if (rating === 3) return "😐";
        if (rating === 2) return "😕";
        if (rating === 1) return "😠";
        return "";
    };

    return (
        <div className="w-full max-w-md mx-auto text-center animate-fade-up">
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-brand-black mb-1">Votre Verdict</h3>
            <p className="text-slate-400 text-sm">Une note globale pour cette mission ?</p>
        </div>

        {/* Stars Container */}
        <div className="relative mb-8 h-20 flex items-center justify-center">
            {/* Background glow for high ratings */}
            {data.globalRating >= 4 && (
                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>
            )}
            
            <div className="flex justify-center gap-1 md:gap-3 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => setData(prev => ({ ...prev, globalRating: star }))}
                    className="group focus:outline-none transition-transform hover:scale-110 hover:-translate-y-1 p-1"
                >
                    <Icon
                    name="Star"
                    size={40} 
                    className={`transition-all duration-300 ${
                        data.globalRating >= star 
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-md' 
                        : 'text-slate-200 fill-white stroke-slate-300 group-hover:stroke-yellow-400'
                    }`}
                    />
                </button>
                ))}
            </div>
        </div>

        {/* Dynamic Reaction Text */}
        <div className="h-8 mb-8 font-bold text-lg text-brand-black animate-fade-in transition-all">
            {data.globalRating > 0 ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="text-2xl">{getReaction(data.globalRating)}</span>
                    {data.globalRating === 5 && "Exceptionnel !"}
                    {data.globalRating === 4 && "Très bien !"}
                    {data.globalRating === 3 && "Correct."}
                    {data.globalRating < 3 && "Peut mieux faire..."}
                </span>
            ) : (
                <span className="text-slate-300 text-sm font-normal">Cliquez sur une étoile</span>
            )}
        </div>

        <div className="text-left animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <TextArea 
            label="Un commentaire ? (Optionnel)"
            placeholder="Racontez-nous ce qui a fait la différence..."
            value={data.comment}
            onChange={(e) => setData(prev => ({ ...prev, comment: e.target.value }))}
            rows={3}
            />
        </div>

        <div className="mt-8">
            <Button 
                onClick={handleSubmit} 
                isLoading={isSubmitting}
                disabled={data.globalRating === 0}
            >
                Envoyer mon avis
            </Button>
        </div>
        </div>
    );
  };

  // --- Success View ---
  if (submitted) {
    return (
      <GlassCard className="max-w-md w-full mx-auto p-10 text-center animate-scale-in">
        <div className="mb-8 relative inline-block">
             <div className="absolute inset-0 bg-green-400 blur-2xl opacity-20 animate-pulse"></div>
            <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl relative z-10">
            <Icon name="Check" size={40} strokeWidth={3} />
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-brand-black mb-3">Merci !</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Votre avis a bien été enregistré. <br/>
          L'équipe Skyimmo vous remercie de votre confiance.
        </p>

        {aiResponse && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 relative text-left">
                <Icon name="Quote" size={20} className="text-brand-accent mb-2" />
                <p className="text-brand-black italic font-medium relative z-10 text-sm leading-relaxed">
                    "{aiResponse}"
                </p>
                <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                         {/* AI Avatar placeholder */}
                         <img src="https://api.dicebear.com/7.x/bottts/svg?seed=SkyAI" alt="AI" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assistant Skyimmo</span>
                </div>
            </div>
        )}

        <Button variant="outline" onClick={() => window.location.reload()} className="mx-auto border-slate-200 hover:border-slate-800">
          Nouvel Avis
        </Button>
      </GlassCard>
    );
  }

  // --- Main Layout ---
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Top Navigation */}
      <div className={`flex items-center justify-between mb-6 transition-opacity duration-300 ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <button 
           onClick={goBack}
           className="flex items-center gap-2 text-slate-400 hover:text-brand-black transition-colors text-xs font-bold uppercase tracking-wider group"
         >
           <div className="p-2 bg-white rounded-full shadow-sm border border-slate-100 group-hover:border-slate-300">
             <Icon name="ArrowLeft" size={14} />
           </div>
           <span>Retour</span>
         </button>
         
         <div className="text-xs font-bold text-slate-300">
            Étape {step} <span className="text-slate-200">/ {TOTAL_STEPS - 1}</span>
         </div>
      </div>

      {/* Main Glass Card */}
      <GlassCard className="min-h-[500px] flex flex-col">
         {/* Step Content Wrapper */}
         <div className="flex-grow flex flex-col justify-center p-6 md:p-10">
            {step === 0 && <IntroStep />}
            {step === 1 && <AgentStep />}
            {step === 2 && (
                <QuestionStep 
                    title="La Ponctualité" 
                    subtitle="Le respect des horaires est primordial pour nous."
                    options={PUNCTUALITY_OPTIONS}
                    field="punctuality"
                />
            )}
            {step === 3 && (
                <QuestionStep 
                    title="Maîtrise du Dossier" 
                    subtitle="L'agent a-t-il su répondre à vos attentes techniques ?"
                    options={KNOWLEDGE_OPTIONS}
                    field="knowledge"
                />
            )}
            {step === 4 && (
                <QuestionStep 
                    title="L'Accompagnement" 
                    subtitle="Vous êtes-vous senti écouté et conseillé ?"
                    options={ACCOMPANIMENT_OPTIONS}
                    field="accompaniment"
                />
            )}
            {step === 5 && (
                <QuestionStep 
                    title="Attitude & Image" 
                    subtitle="Le professionnalisme était-il au rendez-vous ?"
                    options={ATTITUDE_OPTIONS}
                    field="attitude"
                />
            )}
            {step === 6 && <FinalStep />}
         </div>

         {/* Bottom Progress Bar */}
         {step > 0 && step < 6 && (
            <ProgressBar progress={(step / (TOTAL_STEPS - 1)) * 100} />
         )}
      </GlassCard>
    </div>
  );
};