import { useContext } from 'react';

import { commands } from '../../shared/models/commands';
import { cells } from '../../shared/models/cells';

import ConsoleContext from '../../context/ConsoleContext';
import consoleActions from '../../shared/store/console/actions';

const moveOperation = {
  UP: { i: -1, j: 0 },
  DOWN: { i: 1, j: 0 },
  RIGHT: { i: 0, j: 1 },
  LEFT: { i: 0, j: -1 },
};

const moveMessages = {
  UP: 'move to UP',
  DOWN: 'move to DOWN',
  RIGHT: 'move to RIGHT',
  LEFT: 'move to LEFT',
};

function useGameHandler() {
  const { consoleDispatch } = useContext(ConsoleContext);

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
        consoleDispatch({ type: consoleActions.WRITE_INFO, payload: { text: moveMessages.UP } });
        return moveTo(board, playerPosition, moveOperation.UP);
      case commands.DOWN.id:
        consoleDispatch({ type: consoleActions.WRITE_INFO, payload: { text: moveMessages.DOWN } });
        return moveTo(board, playerPosition, moveOperation.DOWN);
      case commands.RIGHT.id:
        consoleDispatch({ type: consoleActions.WRITE_INFO, payload: { text: moveMessages.RIGHT } });
        return moveTo(board, playerPosition, moveOperation.RIGHT);
      case commands.LEFT.id:
        consoleDispatch({ type: consoleActions.WRITE_INFO, payload: { text: moveMessages.LEFT } });
        return moveTo(board, playerPosition, moveOperation.LEFT);
      default:
        throw new Error('movement not allowed');
    }
  };

  return { doMovement };
}

export default useGameHandler;
