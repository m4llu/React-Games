import React, { useState } from 'react';

// kompopnentti
const DiceRoller = () => {
  // muuttuja joka säilyttää silmälukua
  const [diceNumber, setDiceNumber] = useState(1);

  // uuden silmäluvun arpominen nappia painettaessa
  const rollDice = () => {
    // arpoo satunnaisen luvun välillä 1-6
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    // asettaa sen muuttujaan
    setDiceNumber(randomNumber);
  };

  // hakee kuvan silmäluku-muuttujan avulla
  const diceImage = require(`../assets/${diceNumber}.png`);
  
  // renderöinti
  return (
    <div className="dice-roller-container">
      <img
        src={diceImage}
        alt={`Dice number: ${diceNumber}`}
        className="dice-image"
      />
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default DiceRoller;