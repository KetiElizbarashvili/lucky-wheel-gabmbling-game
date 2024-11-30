import React, { useState } from "react";
import styles from "./Wheel.module.css";
import { segments, getRandomSegment } from "./WheelLogic";

const Wheel = ({ onSpinEnd }) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const handleSpin = () => {
        if (isSpinning) return;
    
        setIsSpinning(true);
    
        const selectedLabel = getRandomSegment();
        const selectedIndex = segments.findIndex((seg) => seg.label === selectedLabel);
    
        const segmentAngle = 360 / segments.length;
        const randomExtraSpins = Math.floor(3 + Math.random() * 3) * 360;
        const targetRotation = randomExtraSpins + selectedIndex * segmentAngle;
    
        setRotation((prevRotation) => prevRotation + targetRotation);
    
        setTimeout(() => {
            setIsSpinning(false);
            onSpinEnd(selectedLabel); 
        }, 4000);
    };
    
    return (
        <div className={styles.wheelContainer}>
            <div className={styles.arrow}></div>

            <div
                className={styles.wheel}
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {segments.map((segment, index) => (
                    <div
                        key={index}
                        className={`${styles.segment} ${segment.color}`}
                        style={{
                            transform: `rotate(${(360 / segments.length) * index}deg)`,
                        }}
                    >
                        <span className={styles.segmentLabel}>{segment.label}</span>
                    </div>
                ))}



                <button
                    className={styles.spinButton}
                    onClick={handleSpin}
                    disabled={isSpinning}
                >
                    Spin
                </button>
            </div>
        </div>
    );
};

export default Wheel;
