import React, { useState } from "react";
import StarryBackground from "./components/Background/StarryBackground";
import BalanceDisplay from "./components/Balance/BalanceDisplay";
import BetInput from "./components/Bet/BetInput";
import SpinButton from "./components/Spin/SpinButton";
import styles from "./App.module.css"; 

const App = () => {
  const [balance, setBalance] = useState(200); 
  const [bet, setBet] = useState("0"); 

  const handleSpin = () => {
    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount!");
      return;
    }
    setBalance((prevBalance) => prevBalance - bet); 
    alert("Spin the wheel!"); 
  };

  return (
    <div className={styles.appContainer}>
      <StarryBackground />
      <h1 className={styles.title}>Lucky Wheel</h1>
      <BalanceDisplay balance={balance} />
      <BetInput bet={bet} setBet={setBet} />
      <SpinButton onSpin={handleSpin} />
    </div>
  );
};

export default App;
 