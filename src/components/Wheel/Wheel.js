import React, { useState } from "react";
import styles from "./Wheel.module.css";
import { segments, getRandomSegment } from "./WheelLogic";

const Wheel = ({ balance, setBalance, bet }) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winningIndex, setWinningIndex] = useState(null);

    const handleSpin = () => {
        if (isSpinning) return;

        if (bet <= 0 || bet > balance) {
            alert("Invalid bet amount!");
            return;
        }

        setBalance((prevBalance) => prevBalance - bet);
        setIsSpinning(true);

        const selectedLabel = getRandomSegment();
        const selectedIndex = segments.findIndex((seg) => seg.label === selectedLabel);

        const segmentAngle = 360 / segments.length;
        const randomExtraSpins = Math.floor(3 + Math.random() * 3) * 360;
        const targetRotation = randomExtraSpins + selectedIndex * segmentAngle;

        setRotation((prevRotation) => prevRotation + targetRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setWinningIndex(selectedIndex);

            const selectedSegment = segments[selectedIndex];
            if (selectedSegment.value > 0) {
                const winnings = bet * selectedSegment.value;
                setBalance((prevBalance) => prevBalance + winnings);
                alert(`You won $${winnings}!`);
            } else {
                alert("You lost! Better luck next time.");
            }
        }, 4000);
    };

    return (
        <div className={styles.wheelContainer}>
            <div
                className={styles.wheel}
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {segments.map((segment, index) => (
                    <div
                        key={index}
                        className={`${styles.segment} ${index === winningIndex ? styles.highlight : ""
                            }`}
                        style={{
                            transform: `rotate(${(360 / segments.length) * index}deg)`,
                            backgroundColor: segment.color,
                        }}
                    >
                        <span className={styles.segmentLabel}>{segment.label}</span>
                    </div>
                ))}
            </div>
            <button
                className={styles.spinButton}
                onClick={handleSpin}
                disabled={isSpinning}
            >
                Spin
            </button>
        </div>
    );
};

export default Wheel;
