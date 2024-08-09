'use server'

import {randomUUID} from "crypto";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {s3} from "@/config/aws";
import {auth} from "@/auth";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export async function generateSignedURL(name: string) {
    const session = await auth()
    if (!session) return {error: 'unauthorized'};

    if (!name) return {error: 'Name of file is required'};
    const key = `PDFs/${randomUUID()}-${name}`.replace(/\s/g, "")

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: key,
        Metadata: {
            userId: session?.user?.id as string,
        }
    });

    const url = await getSignedUrl(s3, command, {expiresIn: 3600});
    return {success: 'Successfully created URL!', url: url, key: key}
}