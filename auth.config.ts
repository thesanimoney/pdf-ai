import type {NextAuthConfig} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {authSchema} from "@/schema";
import {getUserByEmail} from "@/data/user";

export default {
    providers: [Credentials({
        credentials: {
            email: {},
        },

        async authorize(credentials) {
            const validateFields = authSchema.safeParse(credentials);

            if (!validateFields.success) return null;

            const {email} = validateFields.data;
            const user = await getUserByEmail(email);

            if (!user) return null;
            return user
        }
    })],
} satisfies NextAuthConfig