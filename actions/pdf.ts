'use server'

import prisma from "@/prisma/client";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";
import {DeleteObjectCommand} from "@aws-sdk/client-s3";
import {redirect} from "next/navigation";
import {s3} from "@/config/aws";
import {createEmbeddings} from "@/actions/embeddings";

export const deletePDFById = async (id: string) => {
    const session = auth()
    if (!session) return {error: "Not authorized"};

    try {
        const deletedFile = await prisma.fileData.delete({
            where: {id: id},
            select: {
                key: true
            }
        })

        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: deletedFile?.key,
        });

        await s3.send(deleteCommand)

        await prisma.message.deleteMany({
            where: {fileDataId: id},
        })

        revalidatePath('/dashboard')
        return {success: 'Successfully deleted!'}

    } catch (err) {
        if (err instanceof Error) return {error: err.message}
    }
}


export async function createPDFInDbAndEmbeddings(name: string, key: string, url: string) {
    const session = await auth()
    if (!session) return {error: 'unauthorized'};

    const document = await prisma.fileData.create({
        data: {
            userId: session?.user?.id as string,
            name: name,
            key: key,
            url: url,
            uploadStatus: 'PROCESSING'
        }
    })

    await createEmbeddings(url, document.id)

    revalidatePath('/dashboard')
    redirect(`/dashboard/${document?.id}`)
}