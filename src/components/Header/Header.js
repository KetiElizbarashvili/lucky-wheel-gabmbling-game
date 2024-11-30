import React from "react";
import styles from "./header.module.css";
import BalanceDisplay from "../../components/Balance/BalanceDisplay";

const Header = ({ balance }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Lucky Wheel</h1>
      <BalanceDisplay balance={balance} />
    </header>
  );
};

export default Header;
 