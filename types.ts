export interface SurveyData {
  agentId: string; // Changed from agentName to ID for better handling
  punctuality: string;
  knowledge: string;
  accompaniment: string;
  attitude: string;
  globalRating: number;
  comment: string;
}

export const INITIAL_DATA: SurveyData = {
  agentId: '',
  punctuality: '',
  knowledge: '',
  accompaniment: '',
  attitude: '',
  globalRating: 0,
  comment: ''
};

// Using placeholders that look professional
export const AGENTS_LIST = [
  { id: 'ismael', name: "Ismaël Boutgayout", role: "Directeur", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ismael&backgroundColor=b6e3f4" },
  { id: 'sarah', name: "Sarah Dubois", role: "Agent Senior", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffdfbf" },
  { id: 'thomas', name: "Thomas Martin", role: "Négociateur", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=c0aede" },
  { id: 'julie', name: "Julie Lefebvre", role: "Experte Location", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julie&backgroundColor=ffdfbf" },
  { id: 'nicolas', name: "Nicolas Bernard", role: "Conseiller", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=d1d4f9" },
  { id: 'autre', name: "Autre / Agence", role: "Équipe", image: "https://api.dicebear.com/7.x/initials/svg?seed=Sky&backgroundColor=0ea5e9" }
];

// Options exactly as per screenshots
export const PUNCTUALITY_OPTIONS = [
  { id: 'retard_grave', label: "Non, il était vraiment très en retard ⏰😂" },
  { id: 'retard_peu', label: "Il était un peu en retard" },
  { id: 'pile', label: "Oui, pile à l'heure 👌" },
  { id: 'avance', label: "Oui, même en avance 🚀" },
];

export const KNOWLEDGE_OPTIONS = [
  { id: 'perdu', label: "Pas du tout, il semblait perdu" },
  { id: 'moyen', label: "Plus ou moins, certaines infos manquaient" },
  { id: 'bien', label: "Oui, il connaissait l'essentiel" },
  { id: 'parfait', label: "Oui, il maîtrisait parfaitement" },
];

export const ACCOMPANIMENT_OPTIONS = [
  { id: 'nul', label: "Pas du tout" },
  { id: 'moyen', label: "Moyennement" },
  { id: 'bien', label: "Oui, plutôt bien" },
  { id: 'super', label: "Oui, super bien 👏" },
];

export const ATTITUDE_OPTIONS = [
  { id: 'pas_pro', label: "Pas du tout professionnel" },
  { id: 'correct', label: "Correct, sans plus" },
  { id: 'pro', label: "Pro, rien à redire" },
  { id: 'top', label: "Excellent, vraiment top ⭐" },
];
