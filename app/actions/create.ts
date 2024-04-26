"use server";

import { prisma } from "@/lib/prismaSingleton";
import { revalidatePath } from "next/cache";

export async function Create(title: string, file: any, description: string | undefined, imageUrl: string | undefined) {

    const result = await prisma.article.create({
        data: {
            title: title,
            article: file,
            date: new Date().toISOString(),
            description: description,
            imageUrl: imageUrl,
        }
    })

    if (result) {
        revalidatePath("/", "page");
        revalidatePath("/acticles/[id]", "page");
        return true;
    }
    return false;

}
