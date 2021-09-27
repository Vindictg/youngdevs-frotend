import React, { useContext, useEffect } from 'react';

import GameHandler from '../../../handlers/GameHandler';
import GameContext from '../../../context/GameContext';
import actions from '../../store/game/actions';

const movementDelay = 500;

function Board() {
  const { state, dispatch } = useContext(GameContext);
  const {
    board, playerPosition, running, nextMovement, commandList,
  } = state;

  const cellInformation = {
    0: { className: 'Board-cell-empty' },
    1: { className: 'Board-cell-player' },
  };

  const doMovement = (movement) => {
    const GameStateUpdated = GameHandler.doMovement(board, movement, playerPosition);

    dispatch({
      type: actions.UPDATE_PLAYER_POSITION,
      payload: { playerPosition: GameStateUpdated.playerPosition },
    });
    dispatch({ type: actions.MOVE, payload: { board: GameStateUpdated.board } });
  };

  useEffect(() => {
    if (nextMovement !== commandList.length && running) {
      setTimeout(() => {
        doMovement(commandList[nextMovement]);
        dispatch({ type: actions.NEXT_COMMAND });
      }, movementDelay);
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
    <div className="Board">
      {generateGameBoard()}
    </div>
  );
}

export default Board;
