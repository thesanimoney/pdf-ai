'use server'

import {authSchema, AuthType} from "@/schema";
import {getUserByEmail} from "@/data/user";
import prisma from "@/prisma/client";

const register = async (values: AuthType) => {
    const {data, success} = authSchema.safeParse(values)
    if (!success) return {error: 'Invalid fields.'}

    if (!data?.email?.endsWith('@globallogic.com') && !data.email?.endsWith('@wcgclinical.com'))
        return {error: 'Please use corporate email.'}

    const existingUser = await getUserByEmail(data?.email)
    if (existingUser) return {error: 'User already exists!'}

    await prisma.user.create({
        data: {
            email: data?.email,
            updatedAt: new Date()
        }
    })

    return {success: 'Successfully registred.'}
};

export default register;