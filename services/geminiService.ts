
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateAssistantResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  useThinking: boolean = false
) => {
  // Always create a new instance right before the call as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.7,
  };

  // Only use thinking budget for Gemini 3 models if requested
  if (useThinking) {
    config.thinkingConfig = { thinkingBudget: 16000 };
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

    if (!response.text) {
      throw new Error("Empty response from model");
    }

    return response.text;
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    
    // Check for specific errors that require re-selecting the key
    if (error.message?.includes("Requested entity was not found") || error.message?.includes("404")) {
      throw new Error("KEY_REQUIRED");
    }
    
    throw error;
  }
};
