import styles from "./navbar.module.css"
import Link from "next/link"

export default function NavBar() {
    return <div className={styles.navBar}>
        <div className={styles.navItem}>
           <Link href="/">
                Home
            </Link>
        </div>
        
    </div>
}
