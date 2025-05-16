import { GoogleGenAI } from "@google/genai";
// import createPrompt from "../utils/createPrompt.js"; //orignial
import createPrompt from "../utils/updated_prompt.js";
async function generateContent(code, apiKey, mode = "general") {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: createPrompt(code, mode) }]
        }
      ]

    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate code review. Please try again later.");
  }
}

export default generateContent;
