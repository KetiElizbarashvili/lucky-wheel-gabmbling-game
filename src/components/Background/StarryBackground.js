import React, { useEffect, useState } from "react";
import styles from "./starryBackground.module.css"

const StarryBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starElements = [];
      for (let i = 0; i < 50; i++) { 
        const size = Math.random() * 40 + 10; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        const rotation = Math.random() * 360; 
        const duration = Math.random() * 2 + 3; 
        starElements.push({ size, x, y, rotation, duration });
      }
      setStars(starElements);
    };

    generateStars();
  }, []);

  return (
    <div className={styles.starryBackground}>
      {stars.map((star, index) => (
        <div
          key={index}
          className={styles.star}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: `rotate(${star.rotation}deg)`,
            animationDuration: `${star.duration}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default StarryBackground;
 