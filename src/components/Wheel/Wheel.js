import React, { useState, useRef } from "react";
import styles from "./Wheel.module.css";
import { segments, spinAPI } from "./WheelLogic";
import { toast } from "react-toastify";

const easeOutCubic = (t) => (--t) * t * t + 1;

const Wheel = React.memo(({ onSpinStart, onSpinEnd, balance = 0, bet = 0 }) => {
  const GameState = {
    Idle: "IDLE",
    Spinning: "SPINNING",
    Cooldown: "COOLDOWN",
  };

  const [rotation, setRotation] = useState(0);
  const [gameState, setGameState] = useState(GameState.Idle);
  const [winningIndex, setWinningIndex] = useState(null);

  const winSoundRef = useRef(null);
  const loseSoundRef = useRef(null);

  const handleSpin = async () => {
    if (gameState !== GameState.Idle) return;

    if (bet <= 0 || bet > balance) {
      toast.error("Invalid bet amount!");
      return;
    }

    if (onSpinStart) onSpinStart();

    try {
      setGameState(GameState.Spinning);

      const { result, winnings } = await spinAPI(bet);
      animateWheel(result, winnings);
    } catch (error) {
      toast.error(error.message || "Spin failed!");
      setGameState(GameState.Idle);
    }
  };

  const animateWheel = (result, winnings) => {
    const selectedIndex = segments.findIndex((seg) => seg.label === result);
    const segmentAngle = 360 / segments.length;
    const randomExtraSpins = Math.floor(3 + Math.random() * 3) * 360;
    const targetRotation = randomExtraSpins + selectedIndex * segmentAngle;

    const duration = 2000;
    const startRotation = rotation;
    const endRotation = startRotation + targetRotation;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutCubic(progress);
      setRotation(startRotation + easedProgress * (endRotation - startRotation));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        finishSpin(result, winnings);
      }
    };

    requestAnimationFrame(step);
  };

  const finishSpin = (result, winnings) => {
    setGameState(GameState.Cooldown);

    if (result === "Lose") {
      if (loseSoundRef.current) loseSoundRef.current.play();
      toast.error("You lost!");
    } else {
      if (winSoundRef.current) winSoundRef.current.play();
      toast.success(`You won ${winnings}!`);
    }

    if (onSpinEnd) onSpinEnd(result, winnings);

    setTimeout(() => {
      setGameState(GameState.Idle);
    }, 5000);
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
            className={`${styles.segment} ${index === winningIndex ? styles.highlight : ""}`}
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
        disabled={gameState !== GameState.Idle}
      >
        {gameState === GameState.Cooldown ? "Cooldown" : "Spin"}
      </button>
    </div>
  );
});

export default Wheel;
 