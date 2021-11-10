import React, { useContext, useEffect } from 'react';
import './Board.scss';
import useGameHandler from '../../../hooks/useGameHandler';
import GameContext from '../../../context/GameContext';
import actions from '../../store/game/actions';
import LevelProvider from '../../../providers/LevelProvider/LevelProvider';

const movementDelay = 500;

function Board({ initialBoard, handleOpenModal, isSolved = false }) {
  const { gameState, gameDispatch } = useContext(GameContext);
  const GameHandler = useGameHandler();

  const {
    board, playerPosition, running, nextCommand, commandList, time, levelID,
  } = gameState;

  const cellInformation = {
    0: { className: 'Board-cell-empty' },
    1: { className: 'Board-cell-player' },
    2: { className: 'Board-cell-wall' },
    3: { className: 'Board-cell-goal' },
  };

  const saveWinnerInfo = async () => {
    const userState = {
      LevelID: Number(levelID),
      Time: time,
      UserSolution: JSON.stringify(commandList),
    };

    const levelValidationData = await LevelProvider.validateLevel(userState);

    handleOpenModal(levelValidationData?.Score);
  };

  const executeCommand = async (movement, currentPosition) => {
    const gameStateUpdated = GameHandler.executeCommand(board, movement, currentPosition);

    if (gameStateUpdated.winner) {
      gameDispatch({ type: actions.SET_TIME_RUNNING, payload: { timeIsRunning: false } });
      await saveWinnerInfo();
      return { repeatCommand: false, currentPosition };
    }

    gameDispatch({
      type: actions.UPDATE_PLAYER_POSITION,
      payload: { playerPosition: gameStateUpdated.playerPosition },
    });
    gameDispatch({ type: actions.MOVE, payload: { board: gameStateUpdated.board } });

    if (!gameStateUpdated.repeatCommand) {
      gameDispatch({ type: actions.NEXT_COMMAND });
    }

    return {
      repeatCommand: gameStateUpdated.repeatCommand,
      playerPosition: gameStateUpdated.playerPosition,
    };
  };

  const executeFrame = async (currentPosition = playerPosition) => {
    if (nextCommand !== commandList.length && running) {
      const commandPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, movementDelay);
      });

      await commandPromise;
      const executionData = await executeCommand(commandList[nextCommand], currentPosition);
      if (executionData.repeatCommand) {
        executeFrame(executionData.playerPosition);
      }
    } else if (nextCommand === commandList.length && running) {
      setTimeout(() => {
        gameDispatch({ type: actions.RESET, payload: { board: initialBoard } });
      }, movementDelay * 2);
    }
  };

  useEffect(() => {
    executeFrame();
  }, [running, nextCommand]);

  useEffect(() => {
    if (!isSolved) {
      gameDispatch({ type: actions.SET_TIME_RUNNING, payload: { timeIsRunning: !running } });
    }
  }, [running]);

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
