import {OpenAIEmbeddings} from "@langchain/openai";

export const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY as string,
        model: 'text-embedding-3-small'
    })