// Form component for submitting a new wildlife sighting
// client for hooks
"use client";

// imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SightingForm.module.css";
import Link from "next/link";

export default function SightingForm() {
    // router used to redirect back to sightings page after submission
    const router = useRouter();

    // state for the list of creatures fetched from the API for the dropdown
    const [creatures, setCreatures] = useState([]);

    // state for each form field
    const [creatureName, setCreatureName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");

    // state for submission feedback
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // fetch the creatures list from the API when the form loads
    useEffect(() => {
        async function fetchCreatures() {
            const response = await fetch("/api/creatures");
            const data = await response.json();
            setCreatures(data);
        }
        fetchCreatures();
    }, []);

    // handles form submission, posts the new sighting to the API
    async function handleSubmit(e) {
        // do not do an inbuilt default action
        e.preventDefault();
        setSubmitting(true);
        setError("");

        // validate that a creature has been selected
        if (!creatureName) {
            setError("Please select a creature before submitting.");
            setSubmitting(false);
            return;
        }

        if (!date) {
            setError("Please select the date of the sighting.")
            setSubmitting(false)
            return;
        }

        if (!location) {
            setError("Please tell us where you saw the creature.")
            setSubmitting(false)
            return;
        }

        try {
            // post new sighting
            const response = await fetch("/api/sightings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // turn content into JSON format for use
                body: JSON.stringify({ creatureName, location, date, notes }),
            });

            // error handling
            if (!response.ok) {
                throw new Error("Failed to submit sighting");
            }

            // redirect back to the sightings page on success
            router.push("/sightings");
        } catch (err) {
            setError("Something went wrong, please try again.");
            setSubmitting(false);
        }
    }

    return (
        <main className={styles.page}>
            <Link href="/sightings" className={styles.back}>
                Return to Sightings
            </Link>
            <h1 className={styles.title}>Report a Sighting</h1>
            <p className={styles.subtitle}>
                Spotted something? Let the us know!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Creature dropdown populated from the creatures API */}
                <label className={styles.label}>
                    Creature:
                    <select
                        className={styles.select}
                        value={creatureName}
                        onChange={(e) => setCreatureName(e.target.value)}
                        required
                    >
                        {/* map creatures to dropdown */}
                        <option value="">Select a creature...</option>
                        {creatures.map((creature) => (
                            <option key={creature.id} value={creature.name}>
                                {creature.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Location text input */}
                <label className={styles.label}>
                    Location
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="e.g. River Itchen, Winchester"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>

                {/* Date input */}
                <label className={styles.label}>
                    Date
                    <input
                        className={styles.input}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>

                {/* Optional notes section */}
                <label className={styles.label}>
                    Notes (optional)
                    <textarea
                        className={styles.textarea}
                        placeholder="Any extra details about the sighting..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                    />
                </label>

                {/* Show error message if submission fails */}
                {error && <p className={styles.error}>{error}</p>}

                <button
                    className={styles.button}
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Report Sighting"}
                </button>
            </form>
        </main>
    );
}