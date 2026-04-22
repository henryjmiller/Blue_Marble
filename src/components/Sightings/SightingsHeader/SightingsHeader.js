// Header for the sightings page
import styles from "./SightingsHeader.module.css";

export default function SightingsHeader() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Wildlife Sightings</h1>
            <p className={styles.subtitle}>
                Browse and report aquatic wildlife spotted across the UK
            </p>
        </header>
    );
}