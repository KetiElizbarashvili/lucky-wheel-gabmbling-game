import React, { useState, useEffect } from "react";
import StarryBackground from "./components/Background/StarryBackground";
import BetInput from "./components/Bet/BetInput";
import Wheel from "./components/Wheel/Wheel";
import Header from "./components/Header/Header";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import styles from "./App.module.css";

const App = () => {
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem("balance");
    return storedBalance ? Number(storedBalance) : 200;
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    return storedLeaderboard;
  });

  const [bet, setBet] = useState(0);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleSpinEnd = (result) => {
    if (result === "Lose") {
      alert("You lost everything! Resetting balance to $200.");
      setBalance(200); 
    } else {
      const winnings = parseInt(result.replace("x", ""), 10) * bet;
      const newBalance = balance + winnings;
      setBalance(newBalance);
  
      const updatedLeaderboard = [...leaderboard, newBalance]
        .sort((a, b) => b - a)
        .slice(0, 3);
      setLeaderboard(updatedLeaderboard);
  
      alert(`You won ${winnings}!`);
    }
    setBet(0); 
  };
  
  useEffect(() => {
    if (balance === 0) {
      alert("Balance was zero. Resetting to $200.");
      setBalance(200);
    }
  }, [balance]);
  
  return (
    <div className={styles.appContainer}>
      <StarryBackground />
      <Header balance={balance} />
      <div className={styles.Container}>
        <BetInput bet={bet} setBet={setBet} />
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
 