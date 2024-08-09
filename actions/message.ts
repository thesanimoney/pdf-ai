'use server'

import {auth} from "@/auth";
import prisma from "@/prisma/client";
import {messageSchema} from "@/schema";
import {revalidatePath} from "next/cache";
import {PineconeStore} from "@langchain/pinecone";
import {embeddings} from "@/config/langchain";
import {pineconeIndex} from "@/config/pinecone";
import {generateText} from "ai";
import {model} from "@/config/openai";
import promptTemplate from "@/config/promptTemplate";

const sendMessage = async (message: string, fileId: string) => {
    const session = await auth();
    if (!session) return {error: 'Unauthorized'};

    const validation = messageSchema.safeParse({message});
    if (!validation.success) return {error: 'Invalid fields!'};

    await prisma.message.create({
        data: {
            text: message,
            fileDataId: fileId,
            userId: session?.user?.id,
            isUserMessage: true,

        }
    })

    revalidatePath(`/dashboard/${fileId}`)
};

export default sendMessage;


export const generateAnswer = async (fileId: string, message: string) => {
    const session = await auth()
    if (!session) return {error: 'Not authorized'}

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: pineconeIndex,
        namespace: fileId
    })

    const result = await vectorStore.similaritySearch(message)

    console.log({result})

    const {text} = await generateText({
        model,
        prompt: promptTemplate(result[0].pageContent, message)
    });

    await prisma.message.create({
        data: {
            text: text,
            fileDataId: fileId,
            userId: session?.user?.id,
            isUserMessage: false,

        }
    })
    revalidatePath(`/dashboard/${fileId}`)
}