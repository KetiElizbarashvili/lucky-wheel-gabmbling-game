import React from "react";
import styles from "./Leaderboard.module.css";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.title}>Leaderboard</h2>
      <ul className={styles.list}>
        {leaderboard.map((score, index) => (
          <li key={index} className={styles.item}>
            #{index + 1}: ${score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Leaderboard);
