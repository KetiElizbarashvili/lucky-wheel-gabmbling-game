import React, { useState } from "react";
import styles from "./Header.module.css";
import BalanceDisplay from "../Balance/BalanceDisplay";
import { toast } from "react-toastify";

const Header = ({ balance }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    toast.info(!isMuted ? "Sound Muted" : "Sound Unmuted");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Lucky Wheel</h1>
      <BalanceDisplay balance={balance} />
      <button
        className={styles.muteButton}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </header>
  );
};

export default React.memo(Header);
 