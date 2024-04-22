import Markdown from "react-markdown";
import { prisma } from "@/lib/prismaSingleton";
import styles from "./page.module.css"

export default async function Article({ params }: { params: { id: string} }) {


    const article = await prisma.article.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    if (!article) {
        return <h3>Article not found.</h3>
    }

    return (
    <div className={styles.articleContainer}>
        <Markdown className={styles.markdownContainer}>{article.article}</Markdown>
    </div>
    )

}
