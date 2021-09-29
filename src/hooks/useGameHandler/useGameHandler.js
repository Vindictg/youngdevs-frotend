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
  UP_ERROR: 'move to UP failed!',
  DOWN_ERROR: 'move to DOWN failed!',
  RIGHT_ERROR: 'move to RIGHT failed!',
  LEFT_ERROR: 'move to LEFT failed!',
};

function useGameHandler() {
  const { consoleDispatch } = useContext(ConsoleContext);

  const moveTo = ({
    board, playerPosition, operation, successMessage, errorMessage,
  }) => {
    const newBoard = [...board];

    try {
      newBoard[playerPosition.i + operation.i][playerPosition.j + operation.j] = cells.PLAYER;
      newBoard[playerPosition.i][playerPosition.j] = cells.EMPTY;

      consoleDispatch({ type: consoleActions.WRITE_INFO, payload: { text: successMessage } });
      return {
        board: newBoard,
        playerPosition: { i: playerPosition.i + operation.i, j: playerPosition.j + operation.j },
      };
    } catch (error) {
      consoleDispatch({
        type: consoleActions.WRITE_WARNING,
        payload: { text: errorMessage },
      });
      return { board: newBoard, playerPosition };
    }
  };

  const doMovement = (board, movement, playerPosition) => {
    switch (movement) {
      case commands.UP.id:
        return moveTo({
          board,
          playerPosition,
          operation: moveOperation.UP,
          successMessage: moveMessages.UP,
          errorMessage: moveMessages.UP_ERROR,
        });
      case commands.DOWN.id:
        return moveTo({
          board,
          playerPosition,
          operation: moveOperation.DOWN,
          successMessage: moveMessages.DOWN,
          errorMessage: moveMessages.DOWN_ERROR,
        });
      case commands.RIGHT.id:
        return moveTo({
          board,
          playerPosition,
          operation: moveOperation.RIGHT,
          successMessage: moveMessages.RIGHT,
          errorMessage: moveMessages.RIGHT_ERROR,
        });
      case commands.LEFT.id:
        return moveTo({
          board,
          playerPosition,
          operation: moveOperation.LEFT,
          successMessage: moveMessages.LEFT,
          errorMessage: moveMessages.LEFT_ERROR,
        });
      default:
        throw new Error('movement not allowed');
    }
  };

  return { doMovement };
}

export default useGameHandler;
