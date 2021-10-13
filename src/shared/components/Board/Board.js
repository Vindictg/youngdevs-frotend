import React, { useContext, useEffect } from 'react';
import './Board.scss';
import useGameHandler from '../../../hooks/useGameHandler';
import GameContext from '../../../context/GameContext';
import actions from '../../store/game/actions';

const movementDelay = 500;

function Board({ initialBoard }) {
  const { gameState, gameDispatch } = useContext(GameContext);
  const GameHandler = useGameHandler();

  const {
    board, playerPosition, running, nextMovement, commandList,
  } = gameState;

  const cellInformation = {
    0: { className: 'Board-cell-empty' },
    1: { className: 'Board-cell-player' },
  };

  const doMovement = (movement) => {
    const GameStateUpdated = GameHandler.doMovement(board, movement, playerPosition);

    gameDispatch({
      type: actions.UPDATE_PLAYER_POSITION,
      payload: { playerPosition: GameStateUpdated.playerPosition },
    });
    gameDispatch({ type: actions.MOVE, payload: { board: GameStateUpdated.board } });
  };

  useEffect(() => {
    if (nextMovement !== commandList.length && running) {
      setTimeout(() => {
        doMovement(commandList[nextMovement]);
        gameDispatch({ type: actions.NEXT_COMMAND });
      }, movementDelay);
    } else if (nextMovement === commandList.length) {
      setTimeout(() => {
        gameDispatch({ type: actions.RESET, payload: { board: initialBoard } });
      }, movementDelay * 2);
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
    <div className="Board-container">
      <div className="Board">
        {generateGameBoard()}
      </div>
    </div>
  );
}

export default Board;
