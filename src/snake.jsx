import React, { useState, useEffect, useCallback } from 'react';

const SnakeGame = () => {
  // State for game variables
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game logic variables
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');

  // Game board size
  const boardSize = 20;

  // Game logic functions
  const startGame = () => {
    // Reset game variables only if the game has not started yet
    if (!gameStarted) {
      setScore(0);
      setGameOver(false);
      setSnake([{ x: 10, y: 10 }]);
      setFood({ x: 5, y: 5 });
      setDirection('RIGHT');
      setGameStarted(true);
    }
  };

  const endGame = () => {
    // End the game logic here
    setGameOver(true);
    setGameStarted(false); // Set the gameStarted state to false
  };
  

  const moveSnake = useCallback(() => {
    if (gameStarted && !gameOver) {
      const newSnake = [...snake];
      let newHead = { ...newSnake[0] };

      // Move the snake based on the current direction
      switch (direction) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
        default:
          break;
      }

      // Check for collision with walls or itself
      if (
        newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize ||
        newSnake.slice(1).some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        endGame();
        return;
      }

      newSnake.unshift(newHead);

      // Check if snake eats the food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }
  }, [snake, direction, food, gameOver, score, gameStarted]);

  const generateFood = () => {
    // Generate random coordinates for the food within the board
    const newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };

    // Regenerate if food overlaps with the snake
    if (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
      generateFood();
    } else {
      setFood(newFood);
    }
  };

  useEffect(() => {
    // Move the snake periodically
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const handleKeyPress = (event) => {
    // Update direction based on arrow key presses
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setDirection('UP');
        break;
      case 'ArrowDown':
        event.preventDefault();
        setDirection('DOWN');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setDirection('LEFT');
        break;
      case 'ArrowRight':
        event.preventDefault();
        setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  // Handle key press events for changing direction
  useEffect(() => {
    if (gameStarted) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [gameStarted]);

  const gameOverMessage = gameOver ? 'Game Over!' : '';

  return (
    <div className="snake-game">
      <h1>Snake Game</h1>
      
      <div className="game-board">
        {Array.from({ length: boardSize }).map((_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {Array.from({ length: boardSize }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${snake.some((cell) => cell.x === colIndex && cell.y === rowIndex) ? 'snake' : ''} ${food.x === colIndex && food.y === rowIndex ? 'food' : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={startGame}>Start Game</button>
      <div className="score">
        <p>Score: {score}</p>
      </div>
        
    {/* Display overlay for winning or losing */}
        {gameStarted && gameOver ? (
            <div className="overlay" onClick={startGame}>
            <div className="win-text"> {gameOverMessage}</div>
        {/* Display a message to start the next game */}
            <div className="continue">Click anywhere to continue</div>
            </div>
    ) : null}
    </div>
  );
};

export default SnakeGame;