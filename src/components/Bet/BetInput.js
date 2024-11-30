import React from "react";
import styles from "./betInput.module.css";

const BetInput = ({ bet, setBet }) => {
  const handleBetChange = (e) => { 
    const value = e.target.value;
    setBet(value === "" ? "" : Number(value)); 
  };
  

  return (
    <div className={styles.sparkleContainer}>
      <input
        type="number"
        value={bet}
        onChange={handleBetChange}
        className={styles.input}
        placeholder="Enter your bet"
      />
      <span className={styles.sparkle}></span>
    </div>
  );
};

export default BetInput;
 