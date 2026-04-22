// Displays a single wildlife sighting as a card
import Link from "next/link";
import styles from "./SightingCard.module.css";

export default function SightingCard({ sighting }) {
    return (
        // wrap the card with Link so clicking anywhere on it will work
        <Link href={`/sightings/${sighting.id}`} className={styles.card}>
            <div className={styles.info}>
                <h3 className={styles.name}>{sighting.creatureName}</h3>
                <p className={styles.location}>{sighting.location}</p>
                <p className={styles.date}>
                    {new Date(sighting.date).toLocaleDateString("en-GB")}
                </p>
            </div>
        </Link>
    );
}