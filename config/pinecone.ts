import {Pinecone} from "@pinecone-database/pinecone";

export const pc = new Pinecone();
export const pineconeIndex = pc.index(process.env.PINECONE_INDEX as string);

