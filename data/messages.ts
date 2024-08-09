import prisma from "@/prisma/client";

interface MessageResponse {
    data: { text: string, isUserMessage: boolean, createdAt: Date }[];
    error?: string;
}

const getMessagesByFileId = async (id: string): Promise<MessageResponse> => {
    try {
        const data = await prisma.message.findMany({
            where: { fileDataId: id },
            select: {
                text: true,
                isUserMessage: true,
                createdAt: true
            }
        });
        return { data };
    } catch (err) {
        return {
            data: [],
            error: err instanceof Error ? err.message : 'An unknown error occurred',
        };
    }
};

export default getMessagesByFileId;
