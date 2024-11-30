import React, { useState } from "react";
import StarryBackground from "./components/Background/StarryBackground";
import BetInput from "./components/Bet/BetInput";
import Wheel from "./components/Wheel/Wheel";
import Header from "./components/Header/Header";
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
      <Header balance={balance} />
      <BetInput bet={bet} setBet={setBet} />
      <Wheel onSpinEnd={handleSpin} />
    </div>
  );
};

export default App;
 