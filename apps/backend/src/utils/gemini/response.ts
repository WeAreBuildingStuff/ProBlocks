import { googleAI } from '@genkit-ai/googleai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { configureGenkit } from '@genkit-ai/core';
import { generate } from '@genkit-ai/ai';
import {
  geminiPro,
} from '@genkit-ai/googleai'

import * as dotenv from 'dotenv';

dotenv.config()

configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY}),
    dotprompt(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})


export async function generateResponse(message : string) {
  const llmResponse = await generate({
    model: geminiPro,
    prompt: message,
  });

  const response = llmResponse.text();

  return response
}