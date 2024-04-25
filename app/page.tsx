import { prisma } from "@/lib/prismaSingleton";
import Link from "next/link";
import styles from "./page.module.css"

export default async function Home({ searchParams }: { searchParams: { query: string, sortBy: string } }) {

    let articles;
    if (searchParams.query) {
        articles = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchParams.query
                        },
                    },
                    {
                        description: {
                            contains: searchParams.query
                        },
                    },
                ],
            }
        });
    } else {
        articles = await prisma.article.findMany();
    }

    if (articles.length > 1 && searchParams.sortBy === "oldest") {
        articles.sort((a,b) => {return b.date.getUTCMilliseconds() - a.date.getUTCMilliseconds()});
    } else if (articles.length > 1 && searchParams.sortBy === "title") {
        articles.sort((a,b) => {return a.title.localeCompare(b.title)})
    } else {
        articles.sort((a,b) => {return a.date.getUTCMilliseconds() - b.date.getUTCMilliseconds()});
    }

    if (!articles) {
        return <div className={styles.articlesContainer}>
            <h2>Articles not found</h2>
        </div>
    }


    return (<div className={styles.articlesContainer}>
        {articles.map((article) => {
            return <div key={article.id} className={styles.article}>
                <h1 className={styles.header}>{article.title}</h1>
                <p className={styles.date}>{article.date.toLocaleDateString()}</p>
                {article.imageUrl && <img className={styles.image} src={article.imageUrl} alt="article image"></img>}
                {article.description && <p className={styles.description}>{article.description}</p>}
                <Link className={styles.link} href={"/articles/" + article.id}>View Post</Link>
            </div>
        })}
    </div>);
}
