import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  compatibility: 'strict',
  headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT
});

export const model = openai('gpt-4o-mini')