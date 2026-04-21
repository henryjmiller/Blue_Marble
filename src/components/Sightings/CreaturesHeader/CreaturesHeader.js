// Header for the creatures page, includes title and kids mode toggle
import styles from "./CreaturesHeader.module.css";

export default function CreaturesHeader({ kidsMode, setKidsMode }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                {/* ternary operator for kids mode */}
                {kidsMode ? "Wildlife Explorer!" : "UK Wildlife Guide"}
            </h1>
            <p className={styles.subtitle}>
                {kidsMode
                    ? "Discover amazing creatures that live in UK waters!"
                    : "Learn about the aquatic species found across the UK"}
            </p>
            {/* Toggle between normal and kids mode */}
            <button
                className={styles.toggle}
                onClick={() => setKidsMode(!kidsMode)}
            >
                {kidsMode ? "Switch to Normal Mode" : "Switch to Kids Mode"}
            </button>
        </header>
    );
}