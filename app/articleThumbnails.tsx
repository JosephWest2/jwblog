"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./articleThumbnails.module.css"
import Link from "next/link";
import Image from "next/image";

type article = {
    id: number,
    title: string,
    date: Date,
    imageUrl: string | null,
    description: string | null
}

export default function ArticleThumbnails({ articles }: { articles: article[] | undefined }) {

    function WidthInit() {
        if (typeof window !== "undefined") {
            return window.innerWidth
        }
        return 1000
    }

    const [width, setWidth] = useState(WidthInit);
    const [col1Contents, setCol1Contents] = useState<JSX.Element[]>([])
    const [col2Contents, setCol2Contents] = useState<JSX.Element[]>([])
    const [articleStack, setArticleStack] = useState<JSX.Element[]>([])
    const [prevArticles, setPrevArticles] = useState(articles);
    const col1 = useRef<HTMLDivElement>(null);
    const col2 = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (typeof window !== "undefined") {
            window.addEventListener('resize', () => {
                setWidth(window.innerWidth)
            })
        }

        if (!articles) { return }
        const elements = articles.map(article => {
            return <div key={article.id} className={styles.article}>
                <h1 className={styles.header}>{article.title}</h1>
                <p className={styles.date}>{article.date.toLocaleDateString()}</p>
                {article.imageUrl && <Image className={styles.image} src={article.imageUrl} height="300" width="300" alt="article image"></Image>}
                {article.description && <p className={styles.description}>{article.description}</p>}
                <Link className={styles.link} href={"/articles/" + article.id}>View Post</Link>
            </div>
        });
        setArticleStack(elements.reverse());
        setCol1Contents([]);
        setCol2Contents([]);

    }, [])

    useEffect(() => {


        if (articleStack.length === 0 || !col1.current || !col2.current) { return; }
        const stack = [...articleStack];
        const _col1Contents = [...col1Contents];
        const _col2Contents = [...col2Contents];

        const h1 = col1.current.getBoundingClientRect().height;
        const h2 = col2.current.getBoundingClientRect().height;

        if (h1 <= h2) {
            _col1Contents.push(stack.pop()!);
        } else {
            _col2Contents.push(stack.pop()!);
        }

        setArticleStack(stack);
        setCol1Contents(_col1Contents);
        setCol2Contents(_col2Contents);

    }, [articleStack])

    if (prevArticles !== articles && articles) {

        const elements = articles.map(article => {
            return <div key={article.id} className={styles.article}>
                <h1 className={styles.header}>{article.title}</h1>
                <p className={styles.date}>{article.date.toLocaleDateString()}</p>
                {article.imageUrl && <Image className={styles.image} src={article.imageUrl} height="300" width="300" alt="article image"></Image>}
                {article.description && <p className={styles.description}>{article.description}</p>}
                <Link className={styles.link} href={"/articles/" + article.id}>View Post</Link>
            </div>
        });
        setPrevArticles(articles);
        setArticleStack(elements.reverse());
        setCol1Contents([]);
        setCol2Contents([]);

    }

    if (!articles || articles.length === 0) {
        return <div className={styles.articlesContainer}>
            <h2>Articles not found</h2>
        </div>
    }

    if (width <= 650) {
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

    return (<div className={styles.articlesContainer}>
        <div ref={col1} className={styles.articleColumn}>{col1Contents}</div>
        <div ref={col2} className={styles.articleColumn}>{col2Contents}</div>
    </div>);

}
