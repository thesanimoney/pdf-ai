'use server'

import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {PineconeStore} from "@langchain/pinecone";
import prisma from "@/prisma/client";
import {pineconeIndex} from "@/config/pinecone";
import {embeddings} from "@/config/langchain";

export const createEmbeddings = async (url: string, id: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const loader = new PDFLoader(blob)
    const docs = await loader.load()

    try {
        await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex: pineconeIndex,
            namespace: id
        })

        await prisma.fileData.update({
            where: {
                id: id
            },
            data: {
                uploadStatus: 'SUCCESS',
            }
        })
    } catch (err) {
        await prisma.fileData.update({
            where: {id: id},
            data: {uploadStatus: 'FAILED'}
        })
        console.error(err)
    }
}