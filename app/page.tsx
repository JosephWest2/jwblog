import { prisma } from "@/lib/prismaSingleton";
import Link from "next/link";

export default async function Home() {

    const articles = await prisma.article.findMany();

    return (<>
        {articles.map((article) => {
            return <div>
                <h2>{article.title}</h2>
                <p>{article.date.toLocaleString()}</p>
                {article.imageUrl && <img src={article.imageUrl}></img>}
                <p>{article.description}</p>
                <Link href={"/articles/" + article.id}>View Post</Link>
            </div>
        })}
    </>);
}
