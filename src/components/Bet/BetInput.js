import React from "react";
import styles from "./betInput.module.css";
import { toast } from "react-toastify";

const BetInput = ({ bet, setBet, balance }) => {
  const handleBetChange = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);

    if (value < 0) {
      toast.error("Bet cannot be negative!");
      setBet(0);
      return;
    }

    if (value > balance) {
      toast.error("Bet cannot exceed your balance!");
      setBet(balance);
      return;
    }

    setBet(value);
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
