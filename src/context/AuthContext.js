"use client";

import { createContext, useContext, useState, useEffect } from "react";

const USERS = [
	{ username: "admin", password: "admin123", role: "admin", displayName: "Admin" },
	{ username: "moderator", password: "mod123", role: "moderator", displayName: "Moderator" },
	{ username: "guest", password: "guest123", role: "guest", displayName: "Guest" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const stored = localStorage.getItem("blueMarbleUser");
		if (stored) {
			try {
				setUser(JSON.parse(stored));
			} catch {
				localStorage.removeItem("blueMarbleUser");
			}
		}
	}, []);

	function login(username, password) {
		const match = USERS.find(
			(u) => u.username === username && u.password === password
		);
		if (!match) return { success: false, error: "Invalid username or password" };

		const sessionUser = {
			username: match.username,
			role: match.role,
			displayName: match.displayName,
		};
		setUser(sessionUser);
		localStorage.setItem("blueMarbleUser", JSON.stringify(sessionUser));
		return { success: true };
	}

	function logout() {
		setUser(null);
		localStorage.removeItem("blueMarbleUser");
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}
