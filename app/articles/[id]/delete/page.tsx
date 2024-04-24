"use client";

import { useRouter } from "next/navigation";
import { Delete } from "@/app/actions/delete";

export default function Page({ params }: { params: { id: string } }) {

    const router = useRouter();

    if (!params.id) {
        return <h2>article not found</h2>
    }

    async function _delete() {
        const result = await Delete(Number(params.id));
        if (result) {
            alert("article deleted")
            router.push("/")
        }
        else {
            alert("failed to delete article")
        }
    }

    return <div className="box col">
        <h2>Delete Article?</h2>
        <button className="btn" style={{width: "100%"}} onClick={_delete}>Delete</button>
    </div>
}
