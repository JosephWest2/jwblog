import { cookies } from "next/headers"
import styles from "./navbar.module.css"
import Link from "next/link"
import { ParseJWT } from "./actions/auth";
import NavSearch from "./navSearch";

export default async function NavBar() {

    const jwtCookie = cookies().get("auth");
    let authenticated = false;
    if (jwtCookie) {
        console.log(jwtCookie.value);
        const jwt = await ParseJWT(jwtCookie.value);
        if (jwt && jwt.payload.admin === true) {
            authenticated = true;
        }
    }

    return <div className={styles.navBar}>
        <div className={styles.navArea + " " + styles.left}>
            <Link className={styles.navItem} href="/">
                Home
            </Link>
            {authenticated && <>
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
