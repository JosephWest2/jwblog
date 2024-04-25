"use client";

import styles from "./navSearch.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavSearch() {

    const router = useRouter();

    const [query, setQuery] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState<string | undefined>();

    function Submit() {
        router.push(`/?query=${query || ""}&sortBy=${sortBy || ""}`);
    }

    return <div className="row" style={{backgroundColor: "transparent"}}>
        <select className={styles.select} onChange={e => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
        </select>
        <input placeholder="Search..." className={styles.input} type="text" onChange={e => setQuery(e.target.value)}></input>
        <button className={styles.input + " " + styles.button} onClick={Submit}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path></g></svg>
        </button>
    </div>
}

