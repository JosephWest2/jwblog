import { prisma } from "@/lib/prismaSingleton";
import ArticleThumbnails from "./articleThumbnails";

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

    return <ArticleThumbnails articles={articles}></ArticleThumbnails>

}
