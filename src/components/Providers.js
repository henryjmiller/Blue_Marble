"use client";

import { AuthProvider } from "../context/AuthContext";
import { EventsProvider } from "../context/EventsContext";

export default function Providers({ children }) {
	return (
		<AuthProvider>
			<EventsProvider>{children}</EventsProvider>
		</AuthProvider>
	);
}
