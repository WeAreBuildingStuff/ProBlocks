import { googleAI } from '@genkit-ai/googleai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { configureGenkit } from '@genkit-ai/core';
import { generate } from '@genkit-ai/ai';
import {
  geminiPro,
  geminiProVision,
  textEmbeddingGecko001,
} from '@genkit-ai/googleai';
import { MessageData } from '@genkit-ai/ai/model';
import { defineSchema } from '@genkit-ai/core';
import z from 'zod';

import * as dotenv from 'dotenv';

dotenv.config()

configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY,  apiVersion: 'v1beta' }),
    dotprompt(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

let history: MessageData[] = [
  { role: 'system', content: [{ text: 'Talk like a pirate.' }] },
]

const Commands = defineSchema(
  'Commands',
  z.array(z.string())
);

export async function generateResponse() {
  // const llmResponse = await generate({
  //   model: geminiPro,
  //   prompt: 'Tell me a joke.',
  //   history
  // });

  // console.log(llmResponse.text());

  const newPrompt = await prompt('move_command');

  const result = await newPrompt.generate<typeof Commands>({
    input: {
      instructions: "move forward for like 4 units, then turn right, and keep moving till you go 10 units"
    }
  });

  console.log(result.output())
}