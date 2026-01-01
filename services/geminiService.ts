import { GoogleGenAI } from "@google/genai";
import { SurveyData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Add agentName to the interface locally for the prompt
interface SurveyDataWithAgentName extends SurveyData {
  agentName: string;
}

export const generateThankYouMessage = async (data: SurveyDataWithAgentName): Promise<string> => {
  if (!apiKey) {
    return "Merci pour votre avis ! Votre satisfaction est notre priorité. L'équipe Skyimmo prendra en compte vos remarques.";
  }

  try {
    const prompt = `
      Tu es l'assistant IA de l'agence immobilière de prestige "Skyimmo" dirigée par Ismaël Boutgayout.
      Un client vient de remplir une enquête de satisfaction suite à une visite.
      
      Voici les détails :
      - Agent concerné : ${data.agentName}
      - Ponctualité : ${data.punctuality}
      - Connaissance du dossier : ${data.knowledge}
      - Accompagnement : ${data.accompaniment}
      - Attitude : ${data.attitude}
      - Note globale : ${data.globalRating}/5
      - Commentaire libre : "${data.comment}"

      Tâche :
      Rédige un message de remerciement (max 30 mots) qui s'affiche à la fin du formulaire.
      
      Ton :
      - Si la note est < 3 ou les retours négatifs : Empathique, professionnel, rassurant sur le fait que Ismaël va traiter le problème.
      - Si la note est >= 4 : Dynamique, chaleureux, style "Start-up / Premium". Utilise 1 emoji si approprié.
      
      Le message doit être directement adressé au client ("Merci pour...").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Merci pour votre retour précieux.";
  } catch (error) {
    console.error("Error generating thank you message:", error);
    return "Merci infiniment pour votre participation. Votre avis nous aide à grandir !";
  }
};