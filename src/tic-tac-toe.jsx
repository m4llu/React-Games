// TicTacToe.jsx

import React, { useState } from 'react';

export function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export function Board({ xIsNext, squares, onPlay }) {
  // Function to handle click event on each square
  function handleClick(i) {
    // Check if there is already a winner or if the square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a new copy of squares array
    const nextSquares = squares.slice();
    // Update the clicked square with X or O based on whose turn it is
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Pass the updated squares to the parent component
    onPlay(nextSquares);
  }

  // Calculate the winner
  const winner = calculateWinner(squares);
  let status;
  // Determine the game status
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render the board
  return (
    <>
      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div className="board-row">
          {/* Render squares in the first row */}
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          {/* Render squares in the second row */}
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          {/* Render squares in the third row */}
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        {/* Display the game status */}
        <div className="status">{status}</div>
      </div>
    </>
  );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Function to handle a player's move
  function handlePlay(nextSquares) {
    // Add the new move to the history
    const nextHistory = [...history, nextSquares];
    setHistory(nextHistory);
    // Update the current move
    setCurrentMove(nextHistory.length - 1);
    
    // Check for a winner
    const gameWinner = calculateWinner(nextSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (currentMove === 8) {
      // Check for a draw when all squares are filled
      setWinner("Draw");
    }
  }

  // Function to start a new game
  function startNextGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
  }

  // Render the game
  return (
    <div className="game">
      <div className="game-board">
        {/* Render the game board */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        {/* Render overlay if there is a winner or draw */}
        {(winner === "Draw" || winner) && (
          <div className="overlay" onClick={startNextGame}>
            <div className={`win-text ${winner === "Draw" ? "draw-text" : ""}`}>
              {winner === "Draw" ? "Draw" : `Winner: ${winner}`}
            </div>
            {/* Display a message to start the next game */}
            <div className='continue'>Click anywhere to start the next game</div>
            {/* Display a link to the author's GitHub profile */}
            <div className='continue'><a href='https://github.com/m4llu'>@m4llu on GitHub</a></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      // Iterate through all possible winning combinations
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // Check if any of the winning combinations have the same symbol
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]; // Return the winning symbol (X or O)
        }
      }
      return null; // Return null if there is no winner
}