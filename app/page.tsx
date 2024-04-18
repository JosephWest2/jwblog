import { prisma } from "@/lib/prismaSingleton";
import Markdown from "react-markdown";

export default async function Home() {

    const articles = await prisma.article.findMany();

    return (<>
        <main>
            {articles.map((article : any) => {
                console.log(article.file);
                return <div className="articleContainer">
                    <p>{article.title}, {JSON.stringify(article.date)}</p>
                    <Markdown className="markdownContainer">{article.file}</Markdown>
                </div>
            })}
        </main >
    </>);
}
