"use client";

import { useEffect, useState } from "react";
import { useEvents } from "../../context/EventsContext";
import styles from "./page.module.css";

export default function MapPage() {
	const { events } = useEvents();
	const [MapView, setMapView] = useState(null);

	useEffect(() => {
		// Leaflet requires window, so load dynamically on the client
		import("../../components/EventMap/EventMap").then((mod) =>
			setMapView(() => mod.default)
		);
	}, []);

	const mappableEvents = events.filter(
		(e) => e.lat != null && e.lng != null
	);

	return (
		<main className={styles.page}>
			<div className={styles.header}>
				<h1 className={styles.title}>Event Map</h1>
				<p className={styles.subtitle}>
					See where our events are happening across England.
				</p>
			</div>

			<div className={styles.mapContainer}>
				{MapView ? (
					<MapView events={mappableEvents} />
				) : (
					<div className={styles.loading}>Loading map…</div>
				)}
			</div>

			{mappableEvents.length === 0 && (
				<p className={styles.empty}>
					No events with map coordinates yet.
				</p>
			)}
		</main>
	);
}
