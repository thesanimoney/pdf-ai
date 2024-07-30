'use server'

import {authSchema, AuthType} from "@/schema";
import {getUserByEmail} from "@/data/user";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";

const login = async (values: AuthType) => {
    try {
        const {data, success} = authSchema.safeParse(values)
        if (!success) return {error: 'Invalid fields.'}

        if (!data?.email?.endsWith('@globallogic.com') && !data.email?.endsWith('@wcgclinical.com'))
            return {error: 'Please use corporate email.'}

        const existingUser = await getUserByEmail(data?.email)
        if (!existingUser) return {error: 'User not found!'}

        await signIn('credentials', {...data, redirectTo: '/dashboard'})

        return {success: 'Successfully logged in.'}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "AccessDenied":
                    return {error: 'Something went wrong...'}
                case "CredentialsSignin" || 'CallbackRouteError':
                    return {error: "Invalid credentials!"};
                default:
                    return {error: "Something went wrong..."};
            }
        }
        throw error
    }
};

export default login;