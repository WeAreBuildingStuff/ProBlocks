import { GoogleGenerativeAI, type Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

export default async function getChatResponse(history : Content[], message : string, memory: Array<string>, prompt?: string) : Promise<string> {
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  if (memory.length > 0) {
    let memoryPrev = ""
  
    memory.forEach((memory) => memoryPrev += (`\n - ` + memory))

    message += `\n\n here is the history of our chat \n ${memoryPrev}`
  }

  const result = await chat.sendMessage(message);
  const response = result.response;
  const text = response.text();
  return text
}