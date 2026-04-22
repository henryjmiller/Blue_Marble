// Floating button that links to the new sighting form
import Link from "next/link";
import styles from "./NewSightingButton.module.css";

export default function NewSightingButton() {
    return (
        // Links to the new sighting form page
        <Link href="/sightings/new" className={styles.button}>
            New Sighting
        </Link>
    );
}