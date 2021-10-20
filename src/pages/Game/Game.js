import React, { useReducer, useEffect, useState } from 'react';
import './Game.scss';
import { Link, useParams, useHistory } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Board from '../../shared/components/Board';
import Console from '../../shared/components/Console';
import CommandSelector from '../../shared/components/CommandSelector';

import gameActions from '../../shared/store/game/actions';
import consoleActions from '../../shared/store/console/actions';
import { reducer as gameReducer, getInitialGameContext } from '../../shared/store/game/reducer';
import GameContext from '../../context/GameContext';

import { reducer as consoleReducer, getInitialConsoleContext } from '../../shared/store/console/reducer';
import ConsoleContext from '../../context/ConsoleContext';
import LevelProvider from '../../providers/LevelProvider';

function Game() {
  const { level: levelID } = useParams();

  const [gameState, gameDispatch] = useReducer(gameReducer, { ...getInitialGameContext() });
  const [consoleState, consoleDispatch] = useReducer(consoleReducer, {
    ...getInitialConsoleContext(),
  });

  const [levelName, setLevelName] = useState('');
  const [levelLoaded, setLevelLoaded] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const routerHistory = useHistory();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const changeToNextLevel = () => {
    gameDispatch({ type: gameActions.RESET_COMMAND_LIST });
    consoleDispatch({ type: consoleActions.RESET });

    routerHistory.push(`/game/${Number(levelID) + 1}`);
    setOpenModal(false);
  };

  const redirectBackToMenu = () => {
    routerHistory.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      const { Map: gameLevel, Name: name } = await LevelProvider.getLevel(levelID);

      const gameLevelMapped = JSON.parse(gameLevel);

      gameDispatch({ type: gameActions.UPDATE_BOARD, payload: { board: gameLevelMapped } });
      setLevelName(name);
      setLevelLoaded(gameLevelMapped);
    };

    fetchData();
  }, [levelID]);

  const { running } = gameState;

  const runOrPauseExecution = () => {
    gameDispatch({ type: gameActions.SWITCH_RUNNING });
  };

  return (
    levelLoaded.length !== 0
    && (
    <ConsoleContext.Provider value={{ consoleState, consoleDispatch }}>
      <GameContext.Provider value={{ gameState, gameDispatch }}>
        <div className="App">
          <header className="App-container">
            <div className="Game-container">
              <div className="Game-container-header">
                <span className="Game-container-header-title">{levelName}</span>
                <span className="Game-container-header-timer">00:00</span>
              </div>
              <div className="Game-container-content">
                <Board initialBoard={levelLoaded} handleOpenModal={handleOpenModal} />
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
        <Modal
          open={openModal}
          onClose={redirectBackToMenu}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="Modal"
        >
          <div className="Modal-container">
            <span className="Modal-title">LEVEL COMPLETED!</span>
            <div className="Modal-buttons-container">
              <Button variant="contained" color="primary" onClick={redirectBackToMenu}>
                BACK TO MENU
              </Button>
              <Button variant="contained" color="primary" onClick={changeToNextLevel}>
                NEXT LEVEL
              </Button>
            </div>
          </div>
        </Modal>
      </GameContext.Provider>
    </ConsoleContext.Provider>
    )
  );
}

export default Game;
