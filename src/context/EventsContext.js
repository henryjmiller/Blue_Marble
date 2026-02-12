"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SEED_EVENTS = [
	{
		id: "1",
		title: "Coastal Cleanup Day",
		description:
			"Join volunteers along the Brighton shoreline to collect litter and plastic waste before it reaches the ocean.",
		date: "2026-03-15",
		time: "09:00",
		location: "Brighton Beach, UK",
		lat: 50.8198,
		lng: -0.1371,
		createdBy: "admin",
		attendees: ["guest"],
	},
	{
		id: "2",
		title: "Coral Reef Awareness Workshop",
		description:
			"An interactive workshop exploring the importance of coral reefs, the threats they face, and what we can do to help protect them.",
		date: "2026-04-02",
		time: "14:00",
		location: "Blue Marble Community Centre, London",
		lat: 51.5074,
		lng: -0.1278,
		createdBy: "moderator",
		attendees: [],
	},
	{
		id: "3",
		title: "Ocean Dead Zones: Public Talk",
		description:
			"Marine biologist Dr. Sarah Chen presents the latest research on ocean dead zones and their growing impact on marine ecosystems.",
		date: "2026-04-18",
		time: "18:30",
		location: "University of Plymouth, Lecture Hall B",
		lat: 50.3755,
		lng: -4.1427,
		createdBy: "admin",
		attendees: ["moderator", "guest"],
	},
];

const STORAGE_KEY = "blueMarbleEvents_v2";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				setEvents(JSON.parse(stored));
			} catch {
				localStorage.removeItem(STORAGE_KEY);
				setEvents(SEED_EVENTS);
			}
		} else {
			setEvents(SEED_EVENTS);
		}
	}, []);

	function persist(next) {
		setEvents(next);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	}

	function addEvent(event) {
		const newEvent = {
			...event,
			id: crypto.randomUUID(),
			attendees: [],
		};
		persist([newEvent, ...events]);
	}

	function updateEvent(id, updates) {
		persist(events.map((e) => (e.id === id ? { ...e, ...updates } : e)));
	}

	function deleteEvent(id) {
		persist(events.filter((e) => e.id !== id));
	}

	function toggleAttendance(eventId, username) {
		persist(
			events.map((e) => {
				if (e.id !== eventId) return e;
				const attending = e.attendees.includes(username);
				return {
					...e,
					attendees: attending
						? e.attendees.filter((u) => u !== username)
						: [...e.attendees, username],
				};
			})
		);
	}

	return (
		<EventsContext.Provider
			value={{ events, addEvent, updateEvent, deleteEvent, toggleAttendance }}
		>
			{children}
		</EventsContext.Provider>
	);
}

export function useEvents() {
	const ctx = useContext(EventsContext);
	if (!ctx) throw new Error("useEvents must be used within an EventsProvider");
	return ctx;
}
