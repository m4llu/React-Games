import React from 'react';
import Game from './Components/tic-tac-toe.jsx';
import SnakeGame from './Components/snake.jsx';
import Counter from './Components/counter.jsx';
import DiceRoller from './Components/dice.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
      <SnakeGame />
      <DiceRoller />
      <Counter initialCount={100} /> 
    </div>
  );
}

export default App;
