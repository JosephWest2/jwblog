"use client";

import styles from "./navClient.module.css";
import Link from "next/link";
import Image from "next/image";
import NavSearch from "./navSearch";
import { useEffect, useState } from "react";
import hamburger from "./hamburgerIcon.png"

export default function NavClient({ authenticated }: { authenticated: boolean }) {

    const [visible, setVisible] = useState(false);
    const [width, setWidth] = useState(widthInit())
    const [_authenticated, set_authenticated] = useState(authenticated);

    useEffect(() => {
       set_authenticated(authenticated); 
    }, [authenticated])

    function widthInit() {
        if (typeof window !== "undefined") {
            return window.innerWidth
        }
        return undefined;
    }

    if (typeof window !== "undefined") {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
    }

    if (width && width < 650) {
        return <div className={styles.navBar} data-visible={visible}>
            <button className={styles.phoneToggle} onClick={e => setVisible(!visible)}>
                <Image src={hamburger} height="25" width="25" alt="="></Image>
            </button>
            <div className={styles.navArea + " " + styles.left}>
                <Link className={styles.navItem} href="/">
                    Home
                </Link>
                {_authenticated && <>
                    <Link href="/articles/create" className={styles.navItem}>
                        Create
                    </Link>
                </>}
                <Link href="/auth/signin" className={styles.navItem + " " + styles.title}>
                    Admin
                </Link>
            </div>
            <div className={styles.navArea + " " + styles.center}>
                <NavSearch></NavSearch>
            </div>
        </div>

    }

    return <div className={styles.navBar} data-visible={visible}>
        <button className={styles.phoneToggle} onClick={e => setVisible(!visible)}>
            <Image src={hamburger} height="25" width="25" alt="="></Image>
        </button>
        <div className={styles.navArea + " " + styles.left}>
            <Link className={styles.navItem} href="/">
                Home
            </Link>
            {_authenticated && <>
                <Link href="/articles/create" className={styles.navItem}>
                    Create
                </Link>
            </>}
        </div>
        <div className={styles.navArea + " " + styles.center}>
            <NavSearch></NavSearch>
        </div>
        <div className={styles.navArea + " " + styles.right}>
            <Link href="/auth/signin" className={styles.navItem + " " + styles.title}>
                <h2>Joey's Blog</h2>
            </Link>
        </div>
    </div>
}
