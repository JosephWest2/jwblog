"use client";

import { useRouter } from "next/router";
import { Delete } from "@/app/actions/delete";

export default function Page() {

    const router = useRouter();
    const id = router.query.id as number | undefined;

    if (!id) {
        return <h2>article not found</h2>
    }

    return <div>
        <h2>Delete Article?</h2>
        <button onClick={() => Delete(id)}>Delete</button>
    </div>
}
