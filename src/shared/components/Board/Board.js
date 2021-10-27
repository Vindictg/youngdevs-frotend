import React, { useContext, useEffect } from 'react';
import './Board.scss';
import useGameHandler from '../../../hooks/useGameHandler';
import GameContext from '../../../context/GameContext';
import actions from '../../store/game/actions';

const movementDelay = 500;

function Board({ initialBoard, handleOpenModal }) {
  const { gameState, gameDispatch } = useContext(GameContext);
  const GameHandler = useGameHandler();

  const {
    board, playerPosition, running, nextCommand, commandList,
  } = gameState;

  const cellInformation = {
    0: { className: 'Board-cell-empty' },
    1: { className: 'Board-cell-player' },
    2: { className: 'Board-cell-wall' },
    3: { className: 'Board-cell-goal' },
  };

  const executeCommand = (movement) => {
    const gameStateUpdated = GameHandler.executeCommand(board, movement, playerPosition);

    if (gameStateUpdated.winner) {
      handleOpenModal();
      gameDispatch({ type: actions.RESET, payload: { board: initialBoard } });
      return false;
    }

    gameDispatch({
      type: actions.UPDATE_PLAYER_POSITION,
      payload: { playerPosition: gameStateUpdated.playerPosition },
    });
    gameDispatch({ type: actions.MOVE, payload: { board: gameStateUpdated.board } });

    if (!gameStateUpdated.repeatCommand) {
      gameDispatch({ type: actions.NEXT_COMMAND });
    }

    return gameStateUpdated.repeatCommand;
  };

  const executeFrame = async () => {
    if (nextCommand !== commandList.length && running) {
      const commandPromise = new Promise((resolve) => {
        setTimeout(() => {
          const repeatCommand = executeCommand(commandList[nextCommand]);
          resolve(repeatCommand);
        }, movementDelay);
      });

      const commandResult = await commandPromise;
      if (commandResult) {
        executeFrame();
      }
    } else if (nextCommand === commandList.length) {
      setTimeout(() => {
        gameDispatch({ type: actions.RESET, payload: { board: initialBoard } });
      }, movementDelay * 2);
    }
  };

  useEffect(() => {
    executeFrame();
  }, [running, nextCommand]);

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
    <div className="Board-container">
      <div className="Board">
        {generateGameBoard()}
      </div>
    </div>
  );
}

export default Board;
