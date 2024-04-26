"use server";

import { prisma } from "@/lib/prismaSingleton";
import { revalidatePath } from "next/cache";

export async function Update(id: number, title: string, file: string, description: string | undefined, imageUrl: string | undefined) {

    const article = await prisma.article.update({
        where: {
            id: id
        },
        data: {
            title: title,
            article: file,
            description: description,
            imageUrl: imageUrl,
        },
    })

    if (article) {
        revalidatePath("/", "page");
        revalidatePath("/acticles/[id]", "page");
        return true
    }
    return false
}
