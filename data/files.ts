'use server'

import prisma from "@/prisma/client";
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";
import {FileData} from "@prisma/client";

interface FileResponse {
    files: FileData[];
    error?: string;
}

export const getFilesByUserId = async ():Promise<FileResponse> => {
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