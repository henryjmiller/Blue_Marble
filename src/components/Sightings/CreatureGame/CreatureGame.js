// interactive creature spotter game component for kids
// shows 5 random creatures with a 10 second timer per round

// for hooks
"use client";

// imports
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CreatureGame.module.css";

export default function CreatureGame({ creatures }) {
    // the 5 random creatures selected for this game out of the database
    const [gameCreatures, setGameCreatures] = useState([]);

    // index of the current round (0-4)
    const [roundIndex, setRoundIndex] = useState(0);

    // the four answer options for the current round
    const [options, setOptions] = useState([]);

    // the id of the option the player selected
    const [selected, setSelected] = useState(null);

    // seconds remaining on the timer
    const [timeLeft, setTimeLeft] = useState(10);

    // the player's score
    const [score, setScore] = useState(0);

    // whether the game has finished
    const [finished, setFinished] = useState(false);

    // pick 5 random creatures and set up the first round when component mounts
    useEffect(() => {
        startGame();
    }, [creatures]);

    // countdown timer, runs every second when a round is active
    useEffect(() => {
        // dont run the timer if the game is finished or player has already answered
        if (finished || selected) return;

        // if time runs out move to the next round automatically
        if (timeLeft === 0) {
            handleTimeout();
            return;
        }

        // intervals of a second
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // clear the interval
        return () => clearInterval(timer);
    }, [timeLeft, selected, finished]);

    // selects 5 random creatures and resets game hooks
    function startGame() {
        // ...creatures gets all the creatures data
        const shuffled = [...creatures].sort(() => Math.random() - 0.5);
        const selected5 = shuffled.slice(0, 5);
        setGameCreatures(selected5);
        setRoundIndex(0);
        setScore(0);
        setFinished(false);
        setSelected(null);
        setTimeLeft(10);
        buildOptions(selected5, 0);
    }

    // builds 4 answer options for the given round
    function buildOptions(list, index) {
        // right answer
        const correct = list[index];

        // pick 3 wrong answers from the full creatures list
        const wrong = creatures
            .filter((c) => c.id !== correct.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        // shuffle correct and wrong together so its an actual challenge
        const shuffled = [...wrong, correct].sort(() => Math.random() - 0.5);
        setOptions(shuffled);
    }

    // handles the player selecting an answer
    function handleAnswer(option) {
        setSelected(option.id);

        // increase score if correct
        if (option.id === gameCreatures[roundIndex].id) {
            setScore((prev) => prev + 1);
        }
    }

    // handles the timer running out with no answer selected
    function handleTimeout() {
        // timeout will alyays be a wrong answer
        setSelected("timeout");
    }

    // moves to the next round or ends the game
    function nextRound() {
        const next = roundIndex + 1;

        // finished
        if (next >= gameCreatures.length) {
            setFinished(true);
            return;
        }

        // reset hooks for next round
        setRoundIndex(next);
        setSelected(null);
        setTimeLeft(10);
        buildOptions(gameCreatures, next);
    }

    // show loading feedbaack as async for creatures to load from db
    if (!creatures || creatures.length === 0) {
        return <p className={styles.loading}>Loading game...</p>;
    }

    // show the score screen when all 5 rounds are done
    if (finished) {
        return (
            <div className={styles.scoreScreen}>
                <h2 className={styles.scoreTitle}>Game Over!</h2>
                <p className={styles.scoreText}>
                    You scored {score} out of {gameCreatures.length}!
                </p>
                {score === gameCreatures.length && (
                    <p className={styles.perfect}>Perfect score! Great job!</p>
                )}
                {/* Retry button picks 5 new random creatures */}
                <button className={styles.retry} onClick={startGame}>
                    Play Again
                </button>
            </div>
        );
    }

    const currentCreature = gameCreatures[roundIndex];

    return (
        <div className={styles.game}>
            {/* Round and score tracker */}
            <div className={styles.tracker}>
                <span>Round {roundIndex + 1} of {gameCreatures.length}</span>
                <span>Score: {score}</span>
            </div>

            {/* countdown */}
            <div className={styles.timerBar}>
                <div
                    className={styles.timerFill}
                    style={{ width: `${(timeLeft / 10) * 100}%` }}
                />
            </div>
            <p className={styles.timerText}>{timeLeft}s</p>

            {/* Creature image */}
            {currentCreature && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={currentCreature.image}
                        alt="Guess this creature!"
                        width={600}
                        height={350}
                        className={styles.image}
                    />
                </div>
            )}

            {/* Options for answers */}
            <div className={styles.options}>
                {options.map((option) => {
                    let optionStyle = styles.option;

                    if (selected) {
                        if (option.id === currentCreature.id) {
                            optionStyle = styles.correct;
                        } else if (option.id === selected) {
                            optionStyle = styles.wrong;
                        }
                    }

                    return (
                        <button
                            key={option.id}
                            className={optionStyle}
                            onClick={() => handleAnswer(option)}
                            disabled={!!selected}
                        >
                            {option.name}
                        </button>
                    );
                })}
            </div>

            {/* user feedback and next button after selection or timeout */}
            {selected && (
                <div className={styles.feedback}>
                    {selected === currentCreature.id ? (
                        <p className={styles.correctText}>Correct! Well done!</p>
                    ) : selected === "timeout" ? (
                        <p className={styles.wrongText}>
                            Time's up! It was the {currentCreature.name}.
                        </p>
                    ) : (
                        <p className={styles.wrongText}>
                            Not quite! It was the {currentCreature.name}.
                        </p>
                    )}
                    <button className={styles.next} onClick={nextRound}>
                        {roundIndex + 1 >= gameCreatures.length ? "See Score" : "Next Creature"}
                    </button>
                </div>
            )}
        </div>
    );
}