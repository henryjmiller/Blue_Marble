// Displays the full detail view of a single wildlife sighting
import Image from "next/image";
import styles from "./SightingDetail.module.css"

export default function SightingDetail({ sighting, creature }) {
    // return tag
    return (
        <main className={styles.page}>
            {/* Creature photo if available (the question mark) */}
            {creature?.image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={creature.image}
                        alt={creature.name}
                        width={800}
                        height={400}
                        className={styles.image}
                    />
                </div>
            )}

            {/* Sighting headline */}
            <div className={styles.header}>
                <h1 className={styles.title}>{sighting.creatureName}</h1>
                <p className={styles.meta}>
                    Spotted at {sighting.location} on{" "}
                    {new Date(sighting.date).toLocaleDateString("en-GB")}
                </p>
            </div>

            {/* Conservation status badge */}
            {creature && (
                <div className={styles.badges}>
                    <span className={styles.badge}>{creature.category}</span>
                    <span className={styles.badge}>{creature.conservationStatus}</span>
                    <span className={styles.badge}>Population: {creature.populationTrend}</span>
                </div>
            )}

            {/* Optional notes */}
            {sighting.notes && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Sighting Notes (if given)</h2>
                    <p className={styles.text}>{sighting.notes}</p>
                </div>
            )}

            {/* About this creature from the creatures database */}
            {creature && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>About the {creature.name}</h2>
                    <p className={styles.text}>{creature.description}</p>
                    <p className={styles.scientific}>{creature.scientificName}</p>
                </div>
            )}
        </main>
    );
}