"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "./page.module.css";

export default function Login() {
	const { user, login } = useAuth();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	if (user) {
		router.push("/");
		return null;
	}

	function handleSubmit(e) {
		e.preventDefault();
		setError("");
		const result = login(username, password);
		if (result.success) {
			router.push("/");
		} else {
			setError(result.error);
		}
	}

	return (
		<main className={styles.page}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>Log In</h1>
				<p className={styles.subtitle}>
					Sign in to your Blue Marble account
				</p>

				{error && <p className={styles.error}>{error}</p>}

				<label className={styles.label}>
					Username
					<input
						className={styles.input}
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>

				<label className={styles.label}>
					Password
					<input
						className={styles.input}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				<button className={styles.button} type="submit">
					Log In
				</button>

				<div className={styles.accounts}>
					<p className={styles.accountsTitle}>Demo accounts</p>
					<ul className={styles.accountList}>
						<li><strong>admin</strong> / admin123 — Full access</li>
						<li><strong>moderator</strong> / mod123 — Can manage events</li>
						<li><strong>guest</strong> / guest123 — Browse only</li>
					</ul>
				</div>
			</form>
		</main>
	);
}
