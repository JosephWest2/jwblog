import styles from "./navbar.module.css"
import Link from "next/link"

export default function NavBar() {
    return <div className={styles.navBar}>
        <Link className={styles.navItem} href="/">
            Home
        </Link>
        <Link href="/auth/signin" className={styles.navItem + " " + styles.title}>
            <h2>Joey's Blog</h2>
        </Link>

    </div>
}
