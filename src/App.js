import React from 'react';
import Game from './tic-tac-toe.jsx';
import SnakeGame from './snake.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
      <SnakeGame />
    </div>
  );
}

export default App;
