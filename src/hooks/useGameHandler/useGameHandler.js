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

const goalMessage = 'you have arrive to the goal!';

const checkEdges = (playerPosition, operation, newBoard) => (
  playerPosition.i + operation.i > newBoard.length - 1
  || playerPosition.i + operation.i < 0
  || playerPosition.j + operation.j > newBoard[0].length - 1
  || playerPosition.j + operation.j < 0
);

function useGameHandler() {
  const { consoleDispatch } = useContext(ConsoleContext);

  const moveTo = ({
    board, playerPosition, operation, successMessage, errorMessage,
  }) => {
    const newBoard = [...board];

    if (checkEdges(playerPosition, operation, newBoard)) {
      consoleDispatch({ type: consoleActions.WRITE_WARNING, payload: { text: errorMessage } });
      return { board: newBoard, playerPosition };
    }

    if (newBoard[playerPosition.i + operation.i][playerPosition.j + operation.j] === cells.WALL) {
      consoleDispatch({ type: consoleActions.WRITE_WARNING, payload: { text: errorMessage } });
      return { board: newBoard, playerPosition };
    }

    if (newBoard[playerPosition.i + operation.i][playerPosition.j + operation.j] === cells.GOAL) {
      consoleDispatch({ type: consoleActions.WRITE_SUCCESS, payload: { text: goalMessage } });
      return { board: newBoard, playerPosition, winner: true };
    }

    newBoard[playerPosition.i + operation.i][playerPosition.j + operation.j] = cells.PLAYER;
    newBoard[playerPosition.i][playerPosition.j] = cells.EMPTY;

    consoleDispatch({ type: consoleActions.WRITE_INFO, payload: { text: successMessage } });

    return {
      board: newBoard,
      playerPosition: { i: playerPosition.i + operation.i, j: playerPosition.j + operation.j },
    };
  };

  const executeIfDo = (board, command, playerPosition) => {
    const operation = moveOperation[command?.action?.display];
    const newBoard = [...board];

    if (
      !checkEdges(playerPosition, operation, newBoard)
      && board[playerPosition.i + operation.i][playerPosition.j + operation.j]
      === command?.condition?.cellID
    ) {
      return moveTo({
        board,
        playerPosition,
        operation,
        successMessage: moveMessages[command?.action?.display],
        errorMessage: moveMessages[`${command?.action?.display}_ERROR`],
      });
    }

    return {
      board: newBoard,
      playerPosition: { ...playerPosition },
      failed: true,
    };
  };

  const executeWhileDo = (board, command, playerPosition) => {
    let ifDoResult = executeIfDo(board, command, playerPosition);

    if (!ifDoResult?.failed) {
      ifDoResult = { ...ifDoResult, repeatCommand: true };
    }

    return ifDoResult;
  };

  const executeCommand = (board, command, playerPosition) => {
    switch (command.id) {
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
      case commands.IF_DO.id:
        return executeIfDo(board, command, playerPosition);
      case commands.WHILE_DO.id:
        return executeWhileDo(board, command, playerPosition);
      default:
        throw new Error('movement not allowed');
    }
  };

  return { executeCommand };
}

export default useGameHandler;
