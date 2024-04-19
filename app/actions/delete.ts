"use server";

import { prisma } from "@/lib/prismaSingleton";

export async function Delete(id: number) {
    prisma.article.delete({

        where: {
            id: id
        }
    })
}
