import Markdown from "react-markdown";
import { prisma } from "@/lib/prismaSingleton";
import styles from "./page.module.css"
import { cookies } from "next/headers";
import { ParseJWT } from "@/app/actions/auth";
import Link from "next/link";

export default async function Article({ params }: { params: { id: string } }) {

    const article = await prisma.article.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    const jwtCookie = cookies().get("auth");
    let authenticated = false;
    if (jwtCookie) {
        console.log(jwtCookie.value);
        const jwt = await ParseJWT(jwtCookie.value);
        if (jwt && jwt.payload.admin === true) {
            authenticated = true;
        }
    }

    if (!article) {
        return <h3>Article not found.</h3>
    }

    return (
        <div className={styles.articleContainer}>
            {authenticated && <div className="row" style={{float: "right", paddingTop: "1.2rem"}}>
                <Link href={`/articles/${params.id}/update`} className="btn">Update</Link>
                <Link href={`/articles/${params.id}/delete`} className="btn">Delete</Link>
            </div>}
            <p className={styles.date}>{article.date.toLocaleDateString()}</p>
            <Markdown className={styles.markdownContainer}>{article.article}</Markdown>
        </div>
    )

}
