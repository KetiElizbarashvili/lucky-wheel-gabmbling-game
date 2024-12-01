import React, { useState, useRef } from "react";
import styles from "./Wheel.module.css";
import { segments, getRandomSegment } from "./WheelLogic";

const Wheel = ({ onSpinStart, onSpinEnd, balance, bet }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [winningIndex, setWinningIndex] = useState(null);

  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);

  const handleSpin = () => {
    if (isSpinning || cooldown > 0) return;

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

      if (selectedSegment.label === "Lose") {
        if (loseSoundRef.current) loseSoundRef.current.play();
      } else {
        if (winSoundRef.current) winSoundRef.current.play();
      }

      if (onSpinEnd) onSpinEnd(selectedSegment.label, winnings);

      startCooldown();
    }, 4000);
  };

  const startCooldown = () => {
    const cooldownTime = 5;
    setCooldown(cooldownTime);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.wheelContainer}>
      <audio ref={winSoundRef} src="/audio/win.mp3" />
      <audio ref={loseSoundRef} src="/audio/lose.mp3" />

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
        disabled={isSpinning || cooldown > 0}
      >
        {cooldown > 0 ? `Wait ${cooldown}s` : "Spin"}
      </button>
    </div>
  );
};

export default Wheel;
 