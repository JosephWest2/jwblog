import Markdown from "react-markdown";

export default async function Article({params} : {params: {name: string}}) {


    const article = await prisma.article.findUnique({
        where: {

                id: params.id
            }
        });

    if (article === null) {
        return <h3>Article not found.</h3>
    }

    return (
        <Markdown className="markdownContainer">{article}</Markdown>
    )

}
