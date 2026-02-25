import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<section className={styles.hero}>
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
			</section>

			<section className={styles.mission}>
				<h2 className={styles.sectionTitle}>Our Mission</h2>
				<p className={styles.sectionText}>
					Blue Marble is a marine conservation initiative dedicated to
					safeguarding the health of our oceans. We believe that healthy seas
					are the foundation of a healthy planet — regulating our climate,
					producing the oxygen we breathe, and supporting billions of
					livelihoods worldwide.
				</p>
				<p className={styles.sectionText}>
					Through community-driven action, scientific research, and public
					education, we work to reverse the damage being done to marine
					ecosystems before it becomes irreversible.
				</p>
			</section>

			<section className={styles.focus}>
				<h2 className={styles.sectionTitle}>What We Focus On</h2>
				<div className={styles.cardGrid}>
					<div className={styles.card}>
						<span className={styles.cardIcon}>🌊</span>
						<h3 className={styles.cardTitle}>Ocean Cleanup</h3>
						<p className={styles.cardText}>
							Organising coastal and underwater cleanups to remove plastic,
							debris, and pollutants from our shores and reefs.
						</p>
					</div>
					<div className={styles.card}>
						<span className={styles.cardIcon}>🐠</span>
						<h3 className={styles.cardTitle}>Marine Life Protection</h3>
						<p className={styles.cardText}>
							Advocating for protected marine areas and sustainable fishing
							practices to preserve biodiversity.
						</p>
					</div>
					<div className={styles.card}>
						<span className={styles.cardIcon}>🗺️</span>
						<h3 className={styles.cardTitle}>Dead Zone Mapping</h3>
						<p className={styles.cardText}>
							Tracking and visualising oxygen-depleted zones in our oceans so
							communities and policymakers can act on real data.
						</p>
					</div>
					<div className={styles.card}>
						<span className={styles.cardIcon}>📢</span>
						<h3 className={styles.cardTitle}>Awareness & Education</h3>
						<p className={styles.cardText}>
							Running events, workshops, and campaigns to connect people with
							the issues facing our oceans today.
						</p>
					</div>
				</div>
			</section>

			<section className={styles.stats}>
				<div className={styles.stat}>
					<span className={styles.statNumber}>8M+</span>
					<span className={styles.statLabel}>
						Tonnes of plastic enter the ocean every year
					</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statNumber}>500+</span>
					<span className={styles.statLabel}>
						Dead zones identified worldwide
					</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statNumber}>50%</span>
					<span className={styles.statLabel}>
						Of coral reefs lost in the last 30 years
					</span>
				</div>
			</section>

			<section className={styles.getInvolved}>
				<h2 className={styles.sectionTitle}>Get Involved</h2>
				<p className={styles.sectionText}>
					Whether you join a beach cleanup, attend one of our events, or simply
					spread the word — every action makes a difference. Our oceans need
					people who care, and that starts with you.
				</p>
				<div className={styles.ctaGroup}>
					<Link href="/events" className={styles.ctaPrimary}>
						View Upcoming Events
					</Link>
					<Link href="/dead-zone-mapping" className={styles.ctaSecondary}>
						Explore the Dead Zone Map
					</Link>
				</div>
			</section>
		</>
	);
}
