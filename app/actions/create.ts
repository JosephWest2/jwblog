"use server";

import { prisma } from "@/lib/prismaSingleton";

export async function Create(title: string, file: any, description: string | undefined, imageUrl: string | undefined) {

    await prisma.article.create({
        data: {
            title: title,
            article: file,
            date: new Date().toISOString(),
            description: description,
            imageUrl: imageUrl,
        }
    })

}
