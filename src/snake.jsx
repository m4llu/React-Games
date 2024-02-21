import React, { useState, useEffect, useCallback } from 'react';

const SnakeGame = () => {

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');

  // häviöruutu
  const [overlayVisible, setOverlayVisible] = useState(true);
  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  // "pelilaudan" koko
  const boardSize = 20;

  // pelin logiikkafunktiot
  const startGame = () => {
    // nollataan pelin muuttujat
    if (!gameStarted) {
      setScore(0);
      setOverlayVisible(true);
      setGameOver(false);
      setSnake([{ x: 10, y: 10 }]);
      setFood({ x: 5, y: 5 });
      setDirection('RIGHT');
      setGameStarted(true);
    }
  };

  const endGame = () => {
    // pelin lopetus
    setGameOver(true);
    setGameStarted(false); 
  };
  

  const moveSnake = useCallback(() => {
    if (gameStarted && !gameOver) {
      const newSnake = [...snake];
      let newHead = { ...newSnake[0] };

      // liikutetaan matoa suunnan mukaan
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

      // tarkistetaan törmäys seinään tai itseensä
      if (
        newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize ||
        newSnake.slice(1).some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        endGame();
        return;
      }

      newSnake.unshift(newHead);

      // tarkistetaan syökö mato ruoan
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
    // generoidaan satunnaiset koordinaatit ruoan spawnaamiselle
    const newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };

    // tarkistetaan osuuko ruoka matoon ja regeneroidaan jos näin on
    if (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
      generateFood();
    } else {
      setFood(newFood);
    }
  };

  useEffect(() => {
    // madon liikkuminen ajoittain
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const handleKeyPress = (event) => {
    // suunnan päivittäminen nappien painalluksen mukaan
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

  // näppäinten painallus event listener
  useEffect(() => {
    if (gameStarted) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [gameStarted]);

  const gameOverMessage = gameOver ? 'Game Over!' : '';

  return (
    <div className="snake-game">
      <h1>SNAKE GAME</h1>
      
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
        
    {/* näytetään overlay ja iso häviö teksti kun pelin häviää */}
    {!gameStarted && gameOver && overlayVisible ? (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="lose-text">{gameOverMessage}</div>
          <div className="continue">Click anywhere to continue</div>
        </div>
      ) : null}
    </div>
  );
};

export default SnakeGame;