import React, { useReducer } from 'react';
import Nav from '../../shared/components/Nav';
import Board from '../../shared/components/Board';
import CommandSelector from '../../shared/components/CommandSelector';
import actions from '../../shared/store/game/actions';
import { reducer, getInitialGameContext } from '../../shared/store/game/reducer';
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
        <Nav />
        <header className="App-header">
          <div className="Game-container">
            <div className="Game-container-board">
              <Board />
              <button type="button" onClick={runOrPauseExecution}>{ running ? 'PAUSE' : 'RUN' }</button>
              <button type="button" onClick={resetGame}>RESET</button>
            </div>
            <CommandSelector />
          </div>
        </header>
      </div>
    </GameContext.Provider>
  );
}

export default Game;
