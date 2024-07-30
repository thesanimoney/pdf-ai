import prisma from "@/prisma/client";

export const getUserByEmail = async (email: string) => {
    try {
       return await prisma.user.findUnique({where: {email}})
    } catch {
        return null
    }
}