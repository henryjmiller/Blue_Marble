"use client";
import Link from "next/link";
import styles from "./CreaturesHeader.module.css";

export default function CreaturesHeader({ kidsMode, setKidsMode }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                {kidsMode ? "Wildlife Explorer!" : "UK Wildlife Guide"}
            </h1>
            <p className={styles.subtitle}>
                {kidsMode
                    ? "Discover amazing creatures that live in UK waters!"
                    : "Learn about the aquatic species found across the UK"}
            </p>

            {/* Kids mode toggle switch */}
            <div className={styles.toggleGroup}>
                <div className={styles.toggleSwitch}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={kidsMode}
                            onChange={() => setKidsMode(!kidsMode)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <span className={styles.toggleLabel}>Kids Mode</span>
                </div>

                <Link href="/creatures/game" className={styles.gameButton}>
                    Play Creature Spotter!
                </Link>
            </div>
        </header>
    );
}