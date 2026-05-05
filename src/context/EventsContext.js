"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch("/api/events")
			.then((r) => r.json())
			.then(setEvents)
			.catch(() => setEvents([]));
	}, []);

	const addEvent = useCallback(async (event) => {
		const res = await fetch("/api/events", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(event),
		});
		if (!res.ok) throw new Error("Failed to create event");
		const newEvent = await res.json();
		setEvents((prev) => [...prev, newEvent]);
	}, []);

	const updateEvent = useCallback(async (id, updates) => {
		const res = await fetch(`/api/events/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updates),
		});
		if (!res.ok) throw new Error("Failed to update event");
		const updated = await res.json();
		setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
	}, []);

	const deleteEvent = useCallback(async (id) => {
		const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
		if (!res.ok) throw new Error("Failed to delete event");
		setEvents((prev) => prev.filter((e) => e.id !== id));
	}, []);

	const toggleAttendance = useCallback(async (eventId, username) => {
		const res = await fetch(`/api/events/${eventId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username }),
		});
		if (!res.ok) throw new Error("Failed to update attendance");
		const updated = await res.json();
		setEvents((prev) => prev.map((e) => (e.id === eventId ? updated : e)));
	}, []);

	const value = useMemo(
		() => ({ events, addEvent, updateEvent, deleteEvent, toggleAttendance }),
		[events, addEvent, updateEvent, deleteEvent, toggleAttendance]
	);

	return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEvents() {
	const ctx = useContext(EventsContext);
	if (!ctx) throw new Error("useEvents must be used within an EventsProvider");
	return ctx;
}
