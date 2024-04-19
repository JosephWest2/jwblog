import { prisma } from "@/lib/prismaSingleton";
import Markdown from "react-markdown";

export default async function Home() {

    const articles = await prisma.article.findMany();

    return (<>
        {articles.map((article) => {
            return <div className="articleContainer">
                <p>{article.title}, {article.date.toLocaleDateString()}</p>
                <Markdown className="markdownContainer">{article.article}</Markdown>
            </div>
        })}
    </>);
}
