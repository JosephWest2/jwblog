"use server";

import { revalidatePath } from "next/cache";

export async function Revalidate() {

    revalidatePath("/", 'layout');
    revalidatePath("/", 'page');

}
