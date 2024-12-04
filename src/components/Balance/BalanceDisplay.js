import React from "react";
import styles from "./balanceDisplay.module.css";

const BalanceDisplay = ({ balance }) => {
  return (
    <div className={styles.balance}>
      Balance: ${balance}
    </div>
  );
};

export default React.memo(BalanceDisplay);
 