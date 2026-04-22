// Displays a single creature card, adapts content based on kids mode
import Image from "next/image";
import styles from "./CreatureCard.module.css";

export default function CreatureCard({ creature, kidsMode }) {
    // return single tag
    return (
        <div className={styles.card}>
            {/* Creature photo IF available*/}
            {creature?.image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={creature.image}
                        alt={creature.name}
                        width={400}
                        height={250}
                        className={styles.image}
                    />
                </div>
            )}

            <div className={styles.body}>
                <h2 className={styles.name}>{creature.name}</h2>

                {/* Show scientific name in normal mode only */}
                {!kidsMode && (
                    <p className={styles.scientific}>{creature.scientificName}</p>
                )}

                {/* Conservation status badge */}
                <span className={styles.badge}>{creature.conservationStatus}</span>

                {/* Kids mode shows fun fact, normal mode shows description */}
                {kidsMode ? (
                    <p className={styles.funFact}>{creature.funFact}</p>
                ) : (
                    <p className={styles.description}>{creature.description}</p>
                )}
            </div>
        </div>
    );
}