// Page displaying all UK aquatic creatures from the database

// use for hooks
"use client";

// imports
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import CreaturesHeader from "@/components/Sightings/CreaturesHeader/CreaturesHeader";
import CreatureGrid from "@/components/Sightings/CreatureGrid/CreatureGrid";
import Link from "next/link";

export default function CreaturesPage() {
    // state for the creatures data fetched from the API
    const [creatures, setCreatures] = useState([]);
    // state to show a loading message while data is being fetched
    const [loading, setLoading] = useState(true);
    // state to toggle between normal and kids mode
    const [kidsMode, setKidsMode] = useState(false);

    // fetch all creatures from the API when the page loads
    useEffect(() => {
        async function fetchCreatures() {
            const response = await fetch("/api/creatures");
            const data = await response.json();
            setCreatures(data);
            setLoading(false);
        }
        fetchCreatures();
    }, []);

    return (
        <main className={styles.page}>
            {/* Header with title and kids mode toggle */}
            <CreaturesHeader kidsMode={kidsMode} setKidsMode={setKidsMode} />

            {/* Show loading message while data is being fetched */}
            {loading ? (
                <p className={styles.loading}>Loading creatures...</p>
            ) : (
                // Once loaded render the grid of creature cards
                <CreatureGrid creatures={creatures} kidsMode={kidsMode} />
            )}
        </main>
    );
}