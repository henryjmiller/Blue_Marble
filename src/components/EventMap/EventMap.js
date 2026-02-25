"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./EventMap.module.css";

// Fix default marker icons that break with bundlers
const defaultIcon = L.icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

// Centre of England roughly
const ENGLAND_CENTER = [52.5, -1.5];
const ENGLAND_ZOOM = 6;

// Restrict panning to roughly England / surrounding area
const ENGLAND_BOUNDS = [
	[49.5, -6.5],
	[56.0, 2.5],
];

export default function EventMap({ events }) {
	return (
		<MapContainer
			center={ENGLAND_CENTER}
			zoom={ENGLAND_ZOOM}
			maxBounds={ENGLAND_BOUNDS}
			maxBoundsViscosity={1.0}
			minZoom={5}
			className={styles.map}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{events.map((event) => (
				<Marker
					key={event.id}
					position={[event.lat, event.lng]}
					icon={defaultIcon}
				>
					<Popup>
						<div className={styles.popup}>
							<strong className={styles.popupTitle}>{event.title}</strong>
							<span className={styles.popupDate}>
								{formatDate(event.date)} at {event.time}
							</span>
							<span className={styles.popupLocation}>{event.location}</span>
							<span className={styles.popupAttendees}>
								{event.attendees.length} attending
							</span>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}

function formatDate(dateStr) {
	const date = new Date(dateStr + "T00:00:00");
	return date.toLocaleDateString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}
