// Game page, gets creatures from db for use in game
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import CreatureGame from "@/components/Sightings/CreatureGame/CreatureGame";

export default function GamePage() {
    const [creatures, setCreatures] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch all creatures from the API
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
            <Link href="/creatures" className={styles.back}>
                Back to Wildlife Guide
            </Link>
            <h1 className={styles.title}>Creature Spotter!</h1>
            <p className={styles.subtitle}>
                How well do you know UK wildlife? You have 10 seconds per roud to guess the correct creature!
            </p>

            {loading ? (
                <p>Loading game...</p>
            ) : (
                <CreatureGame creatures={creatures} />
            )}
        </main>
    );
}