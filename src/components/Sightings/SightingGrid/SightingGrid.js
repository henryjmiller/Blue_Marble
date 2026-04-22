// Displays a grid of sighting cards, or a message if there are no sightings
import SightingCard from "../SightingCard/SightingCard";
import styles from "./SightingGrid.module.css";

export default function SightingGrid({ sightings }) {
    // If there are no sightings, show a friendly message instead
    if (sightings.length === 0) {
        return (
            <p className={styles.empty}>
                No sightings yet — be the first to report one!
            </p>
        );
    }

    return (
        // Map over the sightings and make a card to display each one
        <div className={styles.grid}>
            {sightings.map((sighting) => (
                <SightingCard key={sighting.id} sighting={sighting} />
            ))}
        </div>
    );
}