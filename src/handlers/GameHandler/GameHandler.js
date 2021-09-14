import { cells, movements } from './entities';

const moveToDown = (board, playerPosition) => {
  const newBoard = [...board];

  newBoard[playerPosition.i][playerPosition.j] = cells.EMPTY;
  newBoard[playerPosition.i + 1][playerPosition.j] = cells.PLAYER;

  return {
    board: newBoard,
    playerPosition: { i: playerPosition.i + 1, j: playerPosition.j },
  };
};

const moveToRight = (board, playerPosition) => {
  const newBoard = [...board];

  newBoard[playerPosition.i][playerPosition.j] = cells.EMPTY;
  newBoard[playerPosition.i][playerPosition.j + 1] = cells.PLAYER;

  return {
    board: newBoard,
    playerPosition: { i: playerPosition.i, j: playerPosition.j + 1 },
  };
};

const doMovement = (board, movement, playerPosition) => {
  switch (movement) {
    case movements.RIGHT:
      return moveToRight(board, playerPosition);
    case movements.DOWN:
      return moveToDown(board, playerPosition);
    default:
      throw new Error('movement not allowed');
  }
};

export default { doMovement };
