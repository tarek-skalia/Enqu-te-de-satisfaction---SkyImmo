import React, { useState } from 'react';
import { 
  SurveyData, 
  INITIAL_DATA, 
  AGENTS_LIST, 
  PUNCTUALITY_OPTIONS, 
  KNOWLEDGE_OPTIONS, 
  ACCOMPANIMENT_OPTIONS, 
  ATTITUDE_OPTIONS 
} from '../types';
import { Button, TextArea, Icon, StickyProgressBar } from './UI';
import { generateThankYouMessage } from '../services/geminiService';

export const SurveyForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");

  const TOTAL_STEPS = 7; 

  const handleSelection = (field: keyof SurveyData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep(prev => prev + 1);
    }, 350); 
  };

  const handleChange = (field: keyof SurveyData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => prev - 1);
  };

  const getDynamicPlaceholder = () => {
    if (data.globalRating === 5) return "Wow ! Qu'est-ce qui a fait la différence aujourd'hui ? 🤩";
    if (data.globalRating >= 4) return "Qu'avez-vous le plus apprécié lors de cette visite ? 🙂";
    if (data.globalRating <= 2) return "Désolé pour cette expérience. Dites-nous ce qui n'a pas été pour qu'on corrige le tir. 🙏";
    return "Une suggestion pour nous aider à nous améliorer ? 🤔";
  };

  const getAgentName = () => {
    const agent = AGENTS_LIST.find(a => a.id === data.agentId);
    return agent ? agent.name : "Unknown Agent";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const finalData = { ...data, agentName: getAgentName() };
    const message = await generateThankYouMessage(finalData);
    setAiResponse(message);
    
    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Step Content ---

  const Step0_Intro = () => (
    <div className="text-center animate-slide-up">
      <div className="relative inline-block mb-10 group cursor-pointer">
        <div className="absolute inset-0 bg-sky-500 blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow"></div>
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-[2rem] relative shadow-[0_0_50px_rgba(255,255,255,0.2)] transform group-hover:scale-105 transition-transform duration-500 border border-white/20">
          <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl">
              <Icon name="Building2" className="text-slate-900 mb-2" size={48} />
              <span className="text-[0.7rem] font-black text-slate-900 leading-tight tracking-wider">SKYIMMO</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight uppercase mb-4 drop-shadow-2xl">
        SKYIMMO
      </h1>
      <p className="text-orange-500 font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-16 animate-pulse">
        L'EXCELLENCE IMMOBILIÈRE
      </p>

      <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-lg mx-auto mb-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        <h2 className="text-2xl font-bold text-white mb-3">Votre avis est précieux</h2>
        <p className="text-slate-300 leading-relaxed font-light">
          Aidez-nous à façonner l'immobilier de demain en quelques clics.
        </p>
      </div>

      <div className="max-w-xs mx-auto">
        <Button onClick={nextStep} animatedBorder={true}>
          Commencer l'expérience
        </Button>
      </div>
    </div>
  );

  const Step1_Agent = () => (
    <div className="w-full">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Qui vous a accompagné ?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {AGENTS_LIST.map(agent => (
          <Button 
            key={agent.id}
            variant="agent" 
            selected={data.agentId === agent.id}
            onClick={() => handleSelection('agentId', agent.id)}
            className="h-auto py-8 hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-700/50 shadow-2xl mb-4 mx-auto group-hover:border-sky-500/50 transition-colors">
              <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-white mb-1">{agent.name}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{agent.role}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  const Step2_Punctuality = () => (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Ponctualité
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {PUNCTUALITY_OPTIONS.map(opt => (
          <Button 
            key={opt.id}
            variant="option" 
            selected={data.punctuality === opt.label}
            onClick={() => handleSelection('punctuality', opt.label)}
            className="text-lg hover:scale-[1.02]"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const Step3_Knowledge = () => (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Maîtrise du dossier
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {KNOWLEDGE_OPTIONS.map(opt => (
          <Button 
            key={opt.id}
            variant="option" 
            selected={data.knowledge === opt.label}
            onClick={() => handleSelection('knowledge', opt.label)}
            className="text-lg hover:scale-[1.02]"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const Step4_Accompaniment = () => (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Accompagnement
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {ACCOMPANIMENT_OPTIONS.map(opt => (
          <Button 
            key={opt.id}
            variant="option" 
            selected={data.accompaniment === opt.label}
            onClick={() => handleSelection('accompaniment', opt.label)}
            className="text-lg hover:scale-[1.02]"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const Step5_Attitude = () => (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Attitude & Professionnalisme
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {ATTITUDE_OPTIONS.map(opt => (
          <Button 
            key={opt.id}
            variant="option" 
            selected={data.attitude === opt.label}
            onClick={() => handleSelection('attitude', opt.label)}
            className="text-lg hover:scale-[1.02]"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const Step6_GlobalRating = () => (
    <div className="text-center w-full max-w-2xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
        Note globale
      </h3>
      <p className="text-slate-400 mb-12 text-lg">Votre impression générale ?</p>

      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-[2rem] p-8 inline-block mb-12 shadow-xl">
        <div className="flex justify-center gap-2 md:gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleSelection('globalRating', star)}
              className="group relative focus:outline-none transition-transform hover:scale-110 p-2"
            >
              <Icon
                name="Star"
                size={52} 
                className={`transition-all duration-300 drop-shadow-2xl ${
                  data.globalRating >= star 
                    ? 'text-amber-400 fill-amber-400 animate-[wiggle_0.4s_ease-in-out]' 
                    : 'text-slate-800 fill-slate-800/50 stroke-slate-600 group-hover:stroke-amber-500/50'
                }`}
              />
               {data.globalRating >= star && (
                 <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full -z-10 animate-pulse"></div>
               )}
            </button>
          ))}
        </div>
        <div className="h-8 mt-6 font-bold text-amber-400 text-xl tracking-wide">
            {data.globalRating === 5 && "Exceptionnel ! ⭐"}
            {data.globalRating === 4 && "Très bien ! 👍"}
            {data.globalRating === 3 && "Correct"}
            {data.globalRating > 0 && data.globalRating < 3 && "Peut mieux faire"}
        </div>
      </div>

      <div className="animate-slide-up space-y-8 max-w-lg mx-auto delay-100">
        <TextArea 
            label="Un dernier mot ? (Optionnel)"
            placeholder={getDynamicPlaceholder()}
            value={data.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
        />
        
        <div className="max-w-xs mx-auto">
          <Button 
              onClick={handleSubmit} 
              isLoading={isSubmitting}
              disabled={data.globalRating === 0}
              animatedBorder={true}
          >
              Envoyer mon avis
          </Button>
        </div>
      </div>
    </div>
  );

  const SuccessView = () => (
    <div className="w-full max-w-xl mx-auto px-4 py-10 text-center animate-slide-up">
        <div className="bg-[#0f172a]/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500"></div>
          
          {/* Confetti effect background */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
             <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
             <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
          </div>

          <div className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400 mb-8 animate-slide-up shadow-[0_0_50px_rgba(74,222,128,0.15)] border border-green-500/20">
            <Icon name="CheckCircle2" size={56} />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">Merci !</h2>
          <p className="text-slate-400 mb-10 text-lg">Votre avis a été transmis à la direction.</p>
          
          <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-700/50 transform transition-all hover:scale-[1.02] duration-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Icon name="Quote" size={64} />
             </div>
            <div className="flex items-center justify-center gap-2 text-sky-400 font-bold mb-4">
              <Icon name="Sparkles" size={18} />
              <span className="text-xs uppercase tracking-[0.2em]">Le mot de l'équipe</span>
            </div>
            <p className="text-white italic leading-relaxed font-medium text-lg relative z-10">"{aiResponse}"</p>
          </div>

          <div className="mt-12">
            <Button variant="ghost" onClick={() => window.location.reload()} className="hover:bg-slate-800/50 rounded-full px-8">
              Retour au début
            </Button>
          </div>
        </div>
    </div>
  );

  if (submitted) return <SuccessView />;

  return (
    <>
      {step > 0 && (
          <StickyProgressBar progress={(step / (TOTAL_STEPS - 1)) * 100} />
      )}
      
      <div className="w-full max-w-4xl mx-auto px-4 pb-12 pt-8 relative z-10">
        {/* Navigation Back */}
        {step > 0 && (
             <button 
                onClick={prevStep}
                className="absolute top-0 left-4 md:left-0 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider bg-slate-900/30 px-4 py-2 rounded-full hover:bg-slate-800"
             >
                 <Icon name="ArrowLeft" size={16} />
                 Retour
             </button>
        )}

        {/* Step Rendering with Key for Animation Reset */}
        <div key={step} className="min-h-[70vh] flex flex-col justify-center items-center animate-slide-in-right">
            {step === 0 && <Step0_Intro />}
            {step === 1 && <Step1_Agent />}
            {step === 2 && <Step2_Punctuality />}
            {step === 3 && <Step3_Knowledge />}
            {step === 4 && <Step4_Accompaniment />}
            {step === 5 && <Step5_Attitude />}
            {step === 6 && <Step6_GlobalRating />}
        </div>
      </div>
    </>
  );
};