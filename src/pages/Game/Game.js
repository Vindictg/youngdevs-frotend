import React, { useReducer } from 'react';

import Board from '../../components/Board';
import { reducer, getInitialGameContext, actions } from '../../reducers/GameReducer/GameReducer';
import GameContext from '../../context/GameContext';

function Game() {
  const [state, dispatch] = useReducer(reducer, { ...getInitialGameContext() });
  const { running } = state;

  const runOrPauseExecution = () => {
    dispatch({ type: actions.SWITCH_RUNNING });
  };

  const resetGame = () => {
    dispatch({ type: actions.RESET });
  };

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          <Board />
          <button type="button" onClick={runOrPauseExecution}>{ running ? 'PAUSE' : 'RUN' }</button>
          <button type="button" onClick={resetGame}>RESET</button>
        </header>
      </div>
    </GameContext.Provider>
  );
}

export default Game;
