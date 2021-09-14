import React, { useState, useEffect } from 'react';

import GameHandler from '../../handlers/GameHandler';
import { movements as possibleMovements } from '../../handlers/GameHandler/entities';

const movementDelay = 700;

function Game() {
  const cellInformation = {
    0: { className: 'Board-cell-empty' },
    1: { className: 'Board-cell-player' },
  };

  const movementsMocked = [
    possibleMovements.RIGHT,
    possibleMovements.DOWN,
    possibleMovements.RIGHT,
    possibleMovements.DOWN,
    possibleMovements.RIGHT,
    possibleMovements.DOWN,
    possibleMovements.RIGHT,
    possibleMovements.DOWN,
  ];

  const initialBoard = [
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  const initialPlayerPosition = { i: 0, j: 0 };

  const [running, setRunning] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);
  const [nextMovement, setNextMovement] = useState(0);

  const runOrPauseExecution = () => {
    setRunning(!running);
  };

  const refreshGame = () => {
    setRunning(false);
    setBoard(initialBoard);
    setPlayerPosition(initialPlayerPosition);
    setNextMovement(0);
  };

  const doMovement = (movement) => {
    const GameInfoUpdated = GameHandler.doMovement(board, movement, playerPosition);

    setPlayerPosition(GameInfoUpdated.playerPosition);
    setBoard([...GameInfoUpdated.board]);
  };

  useEffect(() => {
    if (nextMovement !== movementsMocked.length && running) {
      setTimeout(() => {
        doMovement(movementsMocked[nextMovement]);
        setNextMovement(nextMovement + 1);
      }, movementDelay);
    }
  }, [running, nextMovement]);

  const generateGameBoard = () => {
    let generatedGameBoard = [];

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board.length; j += 1) {
        generatedGameBoard = [
          ...generatedGameBoard,
          <div key={`${i}${j}`} className={cellInformation[board[i][j]].className} />,
        ];
      }
    }

    return generatedGameBoard;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Board">
          {generateGameBoard()}
        </div>
        <button type="button" onClick={runOrPauseExecution}>{ running ? 'PAUSE' : 'RUN' }</button>
        <button type="button" onClick={refreshGame}>REFRESH</button>
      </header>
    </div>
  );
}

export default Game;
