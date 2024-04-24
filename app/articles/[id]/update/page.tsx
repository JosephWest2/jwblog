import { prisma } from "@/lib/prismaSingleton";
import UpdateForm from "./updateForm";

export default async function page({params} : {params: {id: string}}) {
    
    const article = await prisma.article.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    if (article) {
        return <UpdateForm article={article}></UpdateForm>
    } else {
        return <h2>Article not found</h2>
    }

}
