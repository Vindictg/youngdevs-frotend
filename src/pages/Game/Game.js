import React, { useReducer } from 'react';
import Nav from '../Nav';
import Board from '../../components/Board';
import CommandSelector from '../../components/CommandSelector';
import { reducer, getInitialGameContext, actions } from '../../reducers/GameReducer/GameReducer';
import GameContext from '../../context/GameContext';

function Game(props) {
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
        <Nav props={props} />
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
