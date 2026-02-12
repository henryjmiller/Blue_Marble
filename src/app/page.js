import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.hero}>
			<div className={styles.bubbles}>
				<span className={styles.bubble} />
				<span className={styles.bubble} />
				<span className={styles.bubble} />
				<span className={styles.bubble} />
				<span className={styles.bubble} />
			</div>

			<div className={styles.content}>
				<h1 className={styles.greeting}>Welcome to Blue Marble</h1>
				<p className={styles.tagline}>
					Dive into marine conservation. Together we can protect our oceans,
					preserve marine life, and keep our waters thriving for generations to
					come.
				</p>
				<Link href="/events" className={styles.cta}>
					Explore Events
				</Link>
			</div>
		</main>
	);
}
