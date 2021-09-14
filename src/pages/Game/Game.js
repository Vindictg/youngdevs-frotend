import React, { useState, useEffect } from 'react';

const possibleMovements = {
  UP: 0,
  DOWN: 1,
  RIGHT: 2,
  LEFT: 3,
};

const possibleCells = {
  EMPTY: 0,
  PLAYER: 1,
};

const cellInformation = {
  0: {
    className: 'Board-cell-empty',
  },
  1: {
    className: 'Board-cell-player',
  },
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
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState({ i: 0, j: 0 });
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
    const newBoard = [...board];

    console.log({ movement });

    switch (movement) {
      case possibleMovements.RIGHT:
        newBoard[currentPlayerPosition.i][currentPlayerPosition.j] = possibleCells.EMPTY;
        newBoard[currentPlayerPosition.i + 1][currentPlayerPosition.j] = possibleCells.PLAYER;
        setCurrentPlayerPosition({ i: currentPlayerPosition.i + 1, j: currentPlayerPosition.j });
        break;
      case possibleMovements.DOWN:
        newBoard[currentPlayerPosition.i][currentPlayerPosition.j] = possibleCells.EMPTY;
        newBoard[currentPlayerPosition.i][currentPlayerPosition.j + 1] = possibleCells.PLAYER;
        setCurrentPlayerPosition({ i: currentPlayerPosition.i, j: currentPlayerPosition.j + 1 });
        break;
      default:
        break;
    }

    console.log(newBoard);
    setBoard([...newBoard]);
  };

  useEffect(() => {
    if (nextMovement !== movementsMocked.length) {
      console.log({ nextMovement });
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
