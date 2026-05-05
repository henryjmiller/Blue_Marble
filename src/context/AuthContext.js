"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

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

	const login = useCallback(async (username, password) => {
		const res = await fetch("/api/accounts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();
		if (!data.success) return { success: false, error: data.error };
		setUser(data.user);
		localStorage.setItem("blueMarbleUser", JSON.stringify(data.user));
		return { success: true };
	}, []);

	const register = useCallback(async (username, password) => {
		const res = await fetch("/api/accounts/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();
		if (!data.success) return { success: false, error: data.error };
		setUser(data.user);
		localStorage.setItem("blueMarbleUser", JSON.stringify(data.user));
		return { success: true };
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem("blueMarbleUser");
	}, []);

	const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}
