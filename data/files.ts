'use server'

import prisma from "@/prisma/client";
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";
import {FileData} from "@prisma/client";

interface FileResponse {
    files: FileData[];
    error?: string;
}

interface FileRender {
    file?: FileData
    error?: string;
}


export const getFilesByUserId = async (): Promise<FileResponse> => {
    const session = await auth();
    if (!session) return {files: [], error: 'unauthorized'};

    try {
        const files = await prisma.fileData.findMany({
            where: {
                userId: session?.user?.id,
            },
        });
        revalidatePath('/dashboard')
        return {files};
    } catch (err) {
        if (err instanceof Error) {
            return {files: [], error: err.message};
        }
        return {files: [], error: 'An unexpected error occurred'};
    }
};

export const getFileById = async (id: string):Promise<FileRender> => {
    const session = await auth();
    if (!session) return {error: 'Unauthorized'};

    const document = await prisma.fileData.findFirst({
        where: {id: id},
    })

    if (!document) return {error: 'File not found'};
    if (document?.userId !== session.user?.id) return {error: 'Unauthorized to view this file'};

    return {file: document};
}