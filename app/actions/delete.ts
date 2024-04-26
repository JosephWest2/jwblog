"use server";

import { prisma } from "@/lib/prismaSingleton";
import { revalidatePath } from "next/cache";

export async function Delete(id: number) {
    const result = await prisma.article.delete({
        where: {
            id: id
        }
    })

    if (result) {
        revalidatePath("/", "page");
        revalidatePath("/acticles/[id]", "page");
        return true
    }
    return false
}
