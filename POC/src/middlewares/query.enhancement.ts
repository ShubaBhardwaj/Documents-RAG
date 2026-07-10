import OpenAI from "openai";
import dotenv from "dotenv";
import { QUERY_ENHANCEMENT_PROMPT } from "../utils/system.prompt";

dotenv.config();

const queryEnhancement = async (userQuery: string): Promise<string> => {
  const clientOpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const llmResponse = await clientOpenAI.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: QUERY_ENHANCEMENT_PROMPT },
      { role: "user", content: userQuery },
    ],
  });

  if (!llmResponse) {
    throw new Error("OpenAI returned an empty response.");
  }

  console.log(`LLM Response:`, llmResponse.choices[0].message.content);
  return llmResponse.choices[0].message.content ?? "";
};
