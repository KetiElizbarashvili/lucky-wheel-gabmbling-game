import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js"; 
import StarryBackground from "./components/Background/StarryBackground";
import BetInput from "./components/Bet/BetInput";
import Wheel from "./components/Wheel/Wheel";
import Header from "./components/Header/Header";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

const SECRET_KEY = "dzlierisecretkey";

const App = () => {
  const [balance, setBalance] = useState(() => {
    try {
      const encryptedBalance = localStorage.getItem("balance");
      if (!encryptedBalance) return 200;
      const bytes = CryptoJS.AES.decrypt(encryptedBalance, SECRET_KEY);
      return Number(bytes.toString(CryptoJS.enc.Utf8)) || 200;
    } catch (err) {
      toast.error("Error loading balance from localStorage");
      return 200;
    }
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const encryptedLeaderboard = localStorage.getItem("leaderboard");
      if (!encryptedLeaderboard) return [];
      const bytes = CryptoJS.AES.decrypt(encryptedLeaderboard, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) || [];
    } catch (err) {
      toast.error("Error loading leaderboard from localStorage");
      return [];
    }
  });

  const [bet, setBet] = useState(0);

  useEffect(() => {
    try {
      const encryptedBalance = CryptoJS.AES.encrypt(
        balance.toString(),
        SECRET_KEY
      ).toString();
      localStorage.setItem("balance", encryptedBalance);
    } catch (err) {
      toast.error("Error saving balance to localStorage");
    }
  }, [balance]);

  useEffect(() => {
    try {
      const encryptedLeaderboard = CryptoJS.AES.encrypt(
        JSON.stringify(leaderboard),
        SECRET_KEY
      ).toString();
      localStorage.setItem("leaderboard", encryptedLeaderboard);
    } catch (err) {
      toast.error("Error saving leaderboard to localStorage");
    }
  }, [leaderboard]);

  const handleSpinEnd = (result) => {
    try {
      if (result === "Lose") {
        toast.error("You lost everything! Resetting balance to $200.");
        setBalance(200);
      } else {
        const winnings = parseInt(result.replace("x", ""), 10) * bet;
        const newBalance = balance + winnings;
        setBalance(newBalance);

        const updatedLeaderboard = [...leaderboard, newBalance]
          .sort((a, b) => b - a)
          .slice(0, 3);
        setLeaderboard(updatedLeaderboard);

        toast.success(`You won ${winnings}!`);
      }
    } catch (err) {
      toast.error("Error calculating winnings");
    }
    setBet(0);
  };

  useEffect(() => {
    if (balance === 0) {
      toast.info("Balance was zero. Resetting to $200.");
      setBalance(200);
    }
  }, [balance]);

  return (
    <div className={styles.appContainer}>
      <StarryBackground />
      <Header balance={balance} />
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
 