// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils';

function Board() {
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe:history',
    [Array(9).fill(null)]
  );
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:current',
    0
  );
  const currentBoard = history[currentStep];
  const nextValue = calculateNextValue(currentBoard);
  const winner = calculateWinner(currentBoard);
  const status = calculateStatus(winner, currentBoard, nextValue);

  // Board index values.
  const isLastStep = currentStep === history.length - 1;
  const isFirstStep = currentStep === 0;

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    if (winner || currentBoard[square]) {
      return;
    }

    const newHistory = history.slice(0, currentStep + 1);
    const newBoard = [...currentBoard];
    newBoard[square] = nextValue;

    setHistory([...newHistory, newBoard]);
    setCurrentStep(newHistory.length);
  }

  function restart() {
    const emptyBoard = Array(9).fill(null);
    setHistory([emptyBoard]);
    setCurrentStep(0);
  }

  const nextBoard = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevBoard = () => {
    setCurrentStep(currentStep - 1);
  };

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {currentBoard[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <div className="history">
        <h3>Moves</h3>
        <div className="history__navigation">
          <button
            disabled={isFirstStep}
            onClick={prevBoard}
          >
            prev
          </button>
          <ul>
            {history.map((board, idx) => {
              const boardString = JSON.stringify(board);
              return (
                <li
                  key={boardString}
                  className={currentStep === idx ? 'history__active' : null}
                >
                  {idx + 1}
                </li>
              );
            })}
          </ul>
          <button
            disabled={isLastStep}
            onClick={nextBoard}
          >
            next
          </button>
        </div>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
