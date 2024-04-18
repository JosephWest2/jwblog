import styles from "./page.module.css";
import NavBar from "./navbar";
import { readdir, readFile} from "node:fs/promises";
import Markdown from "react-markdown";

export default async function Home() {

    const articles = [] as string[];
    const articleDir = await readdir("articles")
    for await (const articleName of articleDir) {
        const fileString = await readFile(`articles/${articleName}`, {encoding: "utf-8"});
        articles.push(fileString);
    }

    return (<>
        <main>
            <h1>Joey's Blog</h1>
            {articles.map(fileString => {
                    return <Markdown className="markdownContainer">{fileString}</Markdown>
            })}
    </main >
    </>);
}
