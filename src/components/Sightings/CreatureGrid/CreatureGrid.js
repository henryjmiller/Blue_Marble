// Displays a grid of creature cards
import CreatureCard from "../CreatureCard/CreatureCard";
import styles from "./CreatureGrid.module.css";

export default function CreatureGrid({ creatures, kidsMode }) {
    // show a message if no creatures are found
    if (creatures.length === 0) {
        return <p className={styles.empty}>No creatures found.</p>;
    }

    return (
        <div className={styles.grid}>
            {creatures.map((creature) => (
                <CreatureCard
                    key={creature.id}
                    creature={creature}
                    kidsMode={kidsMode}
                />
            ))}
        </div>
    );
}