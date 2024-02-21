import React, { useState } from 'react';

const DiceRoller = () => {
  const [diceNumber, setDiceNumber] = useState(1);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);
  };

  const diceImage = require(`../assets/${diceNumber}.png`);
  
  return (
    <div className="dice-roller-container">
      <img
        src={diceImage}
        alt={`Dice showing ${diceNumber}`}
        className="dice-image"
      />
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default DiceRoller;