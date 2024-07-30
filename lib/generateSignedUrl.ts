'use server'

import {auth} from "@/auth";
import {randomUUID} from "crypto";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {s3} from "@/config/s3";

export async function generateSignedURL(name: string) {
    const session = await auth()
    if (!session) return {error: 'unauthorized'};

    const key = `PDFs/${randomUUID()}-${name}`.replace(/\s/g, "")

    try {
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: key,
            ContentType: 'application/pdf',
            Metadata: {
                userId: session?.user?.id as string,
            }
        });

        const url = await getSignedUrl(s3, command, {expiresIn: 3600});
        return {success: 'Successfully created URL!', url: url, key: key}

    } catch (err) {
        if (err instanceof Error) return {error: err.message}
    }
}