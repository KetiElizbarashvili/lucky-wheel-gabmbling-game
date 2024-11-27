import React from "react";
import styles from "./spinButton.module.css";

const SpinButton = ({ onSpin }) => {
  return (
    <button onClick={onSpin} className={styles.sparkleButton}>
      Spin
    </button>
  );
};

export default SpinButton;
 