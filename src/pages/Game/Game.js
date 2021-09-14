import React, { useState, useEffect } from 'react';

import GameHandler from '../../handlers/GameHandler';
import { movements as possibleMovements } from '../../handlers/GameHandler/entities';

const cellInformation = {
  0: { className: 'Board-cell-empty' },
  1: { className: 'Board-cell-player' },
};

const movementDelay = 1000;

function Game() {
  const [board, setBoard] = useState([
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [playerPosition, setPlayerPosition] = useState({ i: 0, j: 0 });
  const [nextMovement, setNextMovement] = useState(0);

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

  const doMovement = (movement) => {
    const GameInfoUpdated = GameHandler.doMovement(board, movement, playerPosition);

    setPlayerPosition(GameInfoUpdated.playerPosition);
    setBoard([...GameInfoUpdated.board]);
  };

  useEffect(() => {
    if (nextMovement !== movementsMocked.length) {
      setTimeout(() => {
        setNextMovement(nextMovement + 1);
        doMovement(movementsMocked[nextMovement]);
      }, movementDelay);
    }
  }, [board]);

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
      </header>
    </div>
  );
}

export default Game;
