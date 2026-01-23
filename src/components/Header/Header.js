import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.brand}>
				<img
					src="/blueMarbleLogo.svg"
					alt="Blue Marble logo"
					className={styles.logo}
				/>
				<span className={styles.name}>Blue Marble</span>
			</div>

			<nav>
				<ul className={styles.nav}>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/events">Events</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
