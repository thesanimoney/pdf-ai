import {z} from "zod";

export const authSchema = z.object({
    email: z.string().email()
})

export type AuthType = z.infer<typeof authSchema>