import { prisma } from "@/lib/prismaSingleton";
import Link from "next/link";
import Markdown from "react-markdown";
import styles from "./page.module.css"

export default async function Home() {

    const articles = await prisma.article.findMany();
    

    return (<div className={styles.articlesContainer}>
        {articles.map((article) => {
            return <div className={styles.article}>
                <h2 className={styles.header}>{article.title}</h2>
                <p className={styles.date}>{article.date.toLocaleDateString()}</p>
                {article.imageUrl && <img className={styles.image} src={article.imageUrl}></img>}
                {article.description && <p className={styles.description}>{article.description}</p>}
                <Link className={styles.link} href={"/articles/" + article.id}>View Post</Link>
                <Markdown></Markdown>
            </div>
        })}
    </div>);
}
