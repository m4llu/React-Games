import React, { useState } from 'react';

export function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export function Board({ xIsNext, squares, onPlay }) {
  // funktio handlaamaan jokaisen klikkauksen
  function handleClick(i) {
    // tarkistetaan onko joku voittanut jo sekä onko ruutu tyhjä
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // luodaan uusi kopio squares arraysta
    const nextSquares = squares.slice();
    // päivitetään klikattuun squareen x tai o riippuen vuorosta
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // viedään päivitetyt squaret parent komponenttiin
    onPlay(nextSquares);
  }

  // lasketaan voittaja
  const winner = calculateWinner(squares);
  let status;
  // tarkistetaan pelin status
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // piirretään pelilauta
  return (
    <>
      <div className="game-container">
        <h1>TIC-TAC-TOE</h1>
        <div className="board-row">
          {/* ensimmäinen rivi */}
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          {/* toinen rivi */}
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          {/* kolmas rivi */}
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        {/* näytetään vuoro */}
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

  // funktio pelaajan siirron läpikäymiseen
  function handlePlay(nextSquares) {
    // lisätään siirto historiaan
    const nextHistory = [...history, nextSquares];
    setHistory(nextHistory);
    // päivitetään seuraavaan siirtoon
    setCurrentMove(nextHistory.length - 1);
    
    // tarkistetaan onko voittajaa
    const gameWinner = calculateWinner(nextSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (currentMove === 8) {
      // jos ruudut ovat täynnä, tasapeli
      setWinner("Draw");
    }
  }

  // uuden pelin aloitus
  function startNextGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
  }

  return (
    <div className="game">
      <div className="game-board">
        {/* pelilauta */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        {/* voitto ruutu */}
        {(winner === "Draw" || winner) && (
          <div className="overlay" onClick={startNextGame}>
            <div className={`win-text ${winner === "Draw" ? "draw-text" : ""}`}>
              {winner === "Draw" ? "Draw" : `Winner: ${winner}`}
            </div>
            <div className='continue'>Click anywhere to start the next game</div>
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
      // käydään ruudut läpi
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // haetaan a b c indeksit
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]; // jos 3 samaa merkkiä on peräkkäin, palautetaan X tai O
        }
      }
      return null; // palautetaan null jos ei löydy voittajaa
}