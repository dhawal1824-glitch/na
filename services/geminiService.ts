
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateAssistantResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  useThinking: boolean = false
) => {
  const ai = getAIClient();
  
  const config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.7,
  };

  if (useThinking) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config,
    });

    return response.text || "I'm sorry Navie, I got a bit lost in my thoughts. Could you say that again?";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Oops, something went wrong! Even geniuses like us have glitches sometimes. Let's try again, Navie! ❤️";
  }
};
