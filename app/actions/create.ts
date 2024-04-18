"use server";

import { prisma } from "@/lib/prismaSingleton";

export async function Create(title: string, file: string) {

    console.log(file);
    console.log(JSON.stringify(file));

    await prisma.article.create({
        data: {
            title: title,
            article: file,
            date: new Date().toISOString()
        }
    })

}
