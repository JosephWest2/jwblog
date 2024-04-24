"use server";

import { prisma } from "@/lib/prismaSingleton";

export async function Delete(id: number) {
    const result = await prisma.article.delete({
        where: {
            id: id
        }
    })

    if (result) {
        return true
    }
    return false
}
