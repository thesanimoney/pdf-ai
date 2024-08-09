import {z} from "zod";

export const authSchema = z.object({
    email: z.string().email()
})

export type AuthType = z.infer<typeof authSchema>

export const messageSchema = z.object({
    message: z.string().min(1, "Message cannot be empty"),
});

export type MessageType = z.infer<typeof messageSchema>