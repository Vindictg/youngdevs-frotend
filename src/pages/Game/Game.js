import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../../shared/components/Nav';
import Board from '../../shared/components/Board';
import Console from '../../shared/components/Console';
import CommandSelector from '../../shared/components/CommandSelector';

import gameActions from '../../shared/store/game/actions';
import { reducer as gameReducer, getInitialGameContext } from '../../shared/store/game/reducer';
import GameContext from '../../context/GameContext';

import { reducer as consoleReducer, getInitialConsoleContext } from '../../shared/store/console/reducer';
import ConsoleContext from '../../context/ConsoleContext';

function Game() {
  const [gameState, gameDispatch] = useReducer(gameReducer, { ...getInitialGameContext() });
  const [consoleState, consoleDispatch] = useReducer(consoleReducer, {
    ...getInitialConsoleContext(),
  });

  const { running } = gameState;

  const runOrPauseExecution = () => {
    gameDispatch({ type: gameActions.SWITCH_RUNNING });
  };

  return (
    <ConsoleContext.Provider value={{ consoleState, consoleDispatch }}>
      <GameContext.Provider value={{ gameState, gameDispatch }}>
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
                <Console />
                <button className="Game-button" type="button" onClick={runOrPauseExecution}>{ running ? 'PAUSE' : 'RUN' }</button>
              </div>
            </div>
          </header>
        </div>
      </GameContext.Provider>
    </ConsoleContext.Provider>
  );
}

export default Game;
