import { commands } from '../../shared/models/commands';
import { cells } from '../../shared/models/cells';

const moveOperation = {
  UP: { i: -1, j: 0 },
  DOWN: { i: 1, j: 0 },
  RIGHT: { i: 0, j: 1 },
  LEFT: { i: 0, j: -1 },
};

const moveTo = (board, playerPosition, operation) => {
  const newBoard = [...board];

  newBoard[playerPosition.i][playerPosition.j] = cells.EMPTY;
  newBoard[playerPosition.i + operation.i][playerPosition.j + operation.j] = cells.PLAYER;

  return {
    board: newBoard,
    playerPosition: { i: playerPosition.i + operation.i, j: playerPosition.j + operation.j },
  };
};

const doMovement = (board, movement, playerPosition) => {
  switch (movement) {
    case commands.UP.id:
      return moveTo(board, playerPosition, moveOperation.UP);
    case commands.DOWN.id:
      return moveTo(board, playerPosition, moveOperation.DOWN);
    case commands.RIGHT.id:
      return moveTo(board, playerPosition, moveOperation.RIGHT);
    case commands.LEFT.id:
      return moveTo(board, playerPosition, moveOperation.LEFT);
    default:
      throw new Error('movement not allowed');
  }
};

export default { doMovement };
