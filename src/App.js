import React, { useState, useEffect } from "react";
import StarryBackground from "./components/Background/StarryBackground";
import BetInput from "./components/Bet/BetInput";
import Wheel from "./components/Wheel/Wheel";
import Header from "./components/Header/Header";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import CustomModal from "./components/Modal/CustomModal";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

const App = () => {
  const [balance, setBalance] = useState(200);
  const [leaderboard, setLeaderboard] = useState([]);
  const [bet, setBet] = useState(0);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });

  const openModal = (title, message) => setModal({ isOpen: true, title, message });
  const closeModal = () => setModal({ isOpen: false, title: "", message: "" });

  const handleSpinEnd = (result) => {
    if (result === "Lose") {
      openModal("You Lost!", "Your balance has been reset to $200.");
      setBalance(200);
    } else {
      const winnings = parseInt(result.replace("x", ""), 10) * bet;
      const newBalance = balance + winnings;
      setBalance(newBalance);

      const updatedLeaderboard = [...leaderboard, newBalance]
        .sort((a, b) => b - a)
        .slice(0, 3);
      setLeaderboard(updatedLeaderboard);

      openModal("Congratulations!", `You won $${winnings}!`);
    }
    setBet(0);
  };

  return (
    <div className={styles.appContainer}>
      <StarryBackground />
      <Header balance={balance} />
      <CustomModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
      <div className={styles.Container}>
        <BetInput bet={bet} setBet={setBet} balance={balance} />
        <Leaderboard leaderboard={leaderboard} />
      </div>
      <Wheel
        balance={balance}
        setBalance={setBalance}
        bet={bet}
        onSpinEnd={handleSpinEnd}
      />
    </div>
  );
};

export default App;
 