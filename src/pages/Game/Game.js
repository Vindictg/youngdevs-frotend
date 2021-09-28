import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Nav />
        <header className="App-container">
          <div className="Game-container">
            <div className="Game-container-content">
              <Board />
              <CommandSelector />
            </div>
            <div className="Game-container-footer">
              <Link className="Game-button" to="/">BACK TO MENU</Link>
              <button className="Game-button" type="button" onClick={runOrPauseExecution}>{ running ? 'PAUSE' : 'RUN' }</button>
            </div>
          </div>
        </header>
      </div>
    </GameContext.Provider>
  );
}

export default Game;
