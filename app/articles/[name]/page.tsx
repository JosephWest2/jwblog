import { readdir, readFile} from "node:fs/promises";
import Markdown from "react-markdown";

export default async function Article({params} : {params: {name: string}}) {

    let article = null as string  | null;
    const articleDir = await readdir("articles")
    for await (const articleName of articleDir) {
        if (articleName.slice(0,-3) === params.name) {
            article =  await readFile(`articles/${articleName}`, {encoding: "utf-8"});
        }
    }

    if (article === null) {
        return <h3>Article not found.</h3>
    }

    return (
        <Markdown className="markdownContainer">{article}</Markdown>
    )

}