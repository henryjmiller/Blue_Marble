"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
	const { user, logout } = useAuth();

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
					<li>
						<Link href="/map">Event Map</Link>
					</li>
					<li>
						<Link href="/dead-zone-mapping">Dead Zone Map</Link>
					</li>
					<li className={styles.authItem}>
						{user ? (
							<div className={styles.userMenu}>
								<span className={styles.userInfo}>
									{user.displayName}
									<span className={styles.roleBadge}>{user.role}</span>
								</span>
								<button className={styles.logoutBtn} onClick={logout}>
									Log Out
								</button>
							</div>
						) : (
							<Link href="/login" className={styles.loginBtn}>
								Log In
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
}
