import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import {getUserByEmail} from "@/data/user";

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },
    callbacks: {
        async signIn({user}) {
            return !!(user?.email?.endsWith('@globallogic.com') || user.email?.endsWith('@wcgclinical.com'));
        },
        async session({session, token}) {
            if (token.sub && session) {
                session.user.id = token.sub
                return session
            }
            return session
        }
    }
})