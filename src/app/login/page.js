"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "./page.module.css";

export default function Login() {
	const { user, login, register } = useAuth();
	const router = useRouter();
	const [mode, setMode] = useState("login");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (user) router.push("/");
	}, [user, router]);

	function switchMode(next) {
		setMode(next);
		setUsername("");
		setPassword("");
		setError("");
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		const result = mode === "login"
			? await login(username, password)
			: await register(username, password);
		if (result.success) {
			router.push("/");
		} else {
			setError(result.error);
		}
	}

	return (
		<main className={styles.page}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>
					{mode === "login" ? "Log In" : "Create Account"}
				</h1>
				<p className={styles.subtitle}>
					{mode === "login"
						? "Sign in to your Blue Marble account"
						: "Join Blue Marble today"}
				</p>

				{error && <p className={styles.error}>{error}</p>}

				<label className={styles.label}>
					Username<input
						className={styles.input}
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>

				<label className={styles.label}>
					Password<input
						className={styles.input}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>

				<button className={styles.button} type="submit">
					{mode === "login" ? "Log In" : "Create Account"}
				</button>

				{mode === "login" ? (
					<>
						<p className={styles.switchMode}>
							Don&apos;t have an account?{" "}
							<button type="button" className={styles.switchLink} onClick={() => switchMode("register")}>
								Sign up
							</button>
						</p>
						<div className={styles.accounts}>
							<p className={styles.accountsTitle}>Demo accounts</p>
							<ul className={styles.accountList}>
								<li><strong>admin</strong> / admin123 — Full access</li>
								<li><strong>moderator</strong> / mod123 — Can manage events</li>
								<li><strong>guest</strong> / guest123 — Browse only</li>
							</ul>
						</div>
					</>
				) : (
					<p className={styles.switchMode}>
						Already have an account?{" "}
						<button type="button" className={styles.switchLink} onClick={() => switchMode("login")}>
							Log in
						</button>
					</p>
				)}
			</form>
		</main>
	);
}
