import React from "react";
import styles from "./balanceDisplay.module.css"

const BalanceDisplay = ({ balance }) => {
  return (
    <div className={styles.balance}>
      Balance: <span className={styles.balanceValue}>${balance}</span>
    </div>
  );
};

export default BalanceDisplay;
 