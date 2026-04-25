import { GoogleGenerativeAI } from "@google/generative-ai";
import { CIVIC_CONTEXT } from "@/lib/election-data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export function getCivicModel() {
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: CIVIC_CONTEXT,
  });
}

export async function streamCivicChat(
  history: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>,
  userMessage: string
) {
  const model = getCivicModel();
  const chat  = model.startChat({ history });
  const result = await chat.sendMessageStream(userMessage);
  return result.stream;
}
