import { GoogleGenerativeAI } from "@google/generative-ai";
import { CIVIC_CONTEXT } from "@/lib/election-data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

/**
 * Returns the Gemini model configured with the civic system prompt
 * and an optional language instruction.
 */
export function getCivicModel(language: string = "English") {
  const languageInstruction =
    language !== "English"
      ? `\n\nIMPORTANT: Always respond in ${language}. Write all your answers entirely in ${language}, including headings and explanations. Do not mix languages.`
      : "";

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: CIVIC_CONTEXT + languageInstruction,
  });
}

export async function streamCivicChat(
  history: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>,
  userMessage: string,
  language: string = "English"
) {
  const model = getCivicModel(language);
  const chat  = model.startChat({ history });
  const result = await chat.sendMessageStream(userMessage);
  return result.stream;
}
