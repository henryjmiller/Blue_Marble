// needed for hooks
"use client";
// imports
import { useState, useEffect } from "react";
import styles from "./page.module.css";
// component imports
import SightingsHeader from "@/components/Sightings/SightingsHeader/SightingsHeader";
import SightingGrid from "@/components/Sightings/SightingGrid/SightingGrid";
import NewSightingButton from "@/components/Sightings/NewSightingButton/NewSightingButton";

export default function SightingsPage() {
    // state for the sightings data fetched from the API
    const [sightings, setSightings] = useState([]);
    // state to show a loading message while data is being fetched
    const [loading, setLoading] = useState(true);

    // get sightings from the API when the page first loads
    useEffect(() => {
        async function fetchSightings() {
            const response = await fetch("/api/sightings");
            const data = await response.json();
            setSightings(data);
            setLoading(false);
        }
        fetchSightings();
    }, []);

    return (
        <main className={styles.page}>
            {/* Header with title and kids mode toggle */}
            <SightingsHeader />

            {/* Show loading message while data is being fetched */}
            {loading ? (
                <p className={styles.loading}>Loading sightings...</p>
            ) : (
                // Once loaded, show the grid of sighting cards
                <SightingGrid sightings={sightings} />
            )}

            {/* Floating button to report a new sighting */}
            <NewSightingButton />
        </main>
    );
}

