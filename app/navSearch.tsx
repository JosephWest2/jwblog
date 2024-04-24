"use client";

import styles from "./navSearch.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavSearch() {

    const router = useRouter();

    const [query, setQuery] = useState<string|undefined>();
    const [sortBy, setSortBy] = useState<string|undefined>();

    function Submit() {
        router.push(`/?query=${query || ""}&sortBy=${sortBy || ""}`);
    }

    return <>
        <select className={styles.select} onChange={e => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
        </select>
        <input className={styles.input} type="text" onChange={e => setQuery(e.target.value)}></input>
        <button className={styles.input + " " + styles.button} onClick={Submit}>Search</button>
    </>
}

