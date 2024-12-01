import React, { useState } from "react";
import styles from "./Wheel.module.css";
import { segments, getRandomSegment } from "./WheelLogic";

const Wheel = ({ onSpinStart, onSpinEnd, balance, setBalance, bet }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndex, setWinningIndex] = useState(null);

  const handleSpin = () => {
    if (isSpinning) return;

    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount!");
      return;
    }

    if (onSpinStart) onSpinStart();

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
      const winnings =
        selectedSegment.label === "Lose"
          ? 0
          : bet * parseInt(selectedSegment.label.replace("x", ""), 10);

      if (onSpinEnd) onSpinEnd(selectedSegment.label, winnings);
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
            className={`${styles.segment} ${
              index === winningIndex ? styles.highlight : ""
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
 