import React, { useReducer, useEffect, useState } from 'react';
import './Game.scss';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Board from '../../shared/components/Board';
import Timer from '../../shared/components/Timer';
import Console from '../../shared/components/Console';
import CommandSelector from '../../shared/components/CommandSelector';
import gameActions from '../../shared/store/game/actions';
import consoleActions from '../../shared/store/console/actions';
import { reducer as gameReducer, getInitialGameContext } from '../../shared/store/game/reducer';
import { reducer as consoleReducer, getInitialConsoleContext } from '../../shared/store/console/reducer';
import GameContext from '../../context/GameContext';
import ConsoleContext from '../../context/ConsoleContext';
import LevelProvider from '../../providers/LevelProvider';
import UserProvider from '../../providers/UserProvider';
import LevelStateProvider from '../../providers/UserLevelStateProvider/UserLevelStateProvider';
import { commands } from '../../shared/models/commands';
import messages from '../../shared/constants/messages';

function Game() {
  const { level: levelID } = useParams();

  const [gameState, gameDispatch] = useReducer(gameReducer, { ...getInitialGameContext() });
  const [consoleState, consoleDispatch] = useReducer(consoleReducer, {
    ...getInitialConsoleContext(),
  });

  const [levelName, setLevelName] = useState('');
  const [levelLoaded, setLevelLoaded] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [score, setScore] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const routerHistory = useHistory();

  const { running, time, commandList } = gameState;

  useEffect(async () => {
    const firstLevel = 1;

    if (Number(levelID) !== firstLevel) {
      const lvlState = await LevelProvider.getLevelState(levelID - 1);

      if (!lvlState.IsSolved) {
        routerHistory.push('/levels');
      }
    }
  }, [levelID]);

  const handleOpenModal = (userScore) => {
    setScore(userScore);
    setOpenModal(true);
  };

  const changeToNextLevel = () => {
    gameDispatch({ type: gameActions.RESET_COMMAND_LIST });

    routerHistory.push(`/game/${Number(levelID) + 1}`);
    setOpenModal(false);
  };

  const savePlayerInfo = async () => {
    await LevelStateProvider.updateUserLevelState({
      LevelID: Number(levelID),
      Time: time,
      UserSolution: JSON.stringify(commandList),
    });
  };

  const redirectBackToMenu = async () => {
    if (!isSolved) {
      await savePlayerInfo();
    }
    routerHistory.push('/');
  };

  const mapDataSaved = (dataSaved) => {
    const { Time: timeSaved, UserSolution, IsSolved } = dataSaved;
    const resetData = {
      running: false,
      nextCommand: 0,
      operationSelected: null,
    };

    return {
      time: timeSaved,
      commandList: JSON.parse(UserSolution || '[]'),
      isSolved: IsSolved,
      ...resetData,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const levelFound = await LevelProvider.getLevel(levelID);

      const userFound = await UserProvider.getUserData();

      if (!levelFound.ID || (!userFound?.IsPremium && levelFound?.IsPremium)) {
        routerHistory.push('/levels');
        return;
      }

      const {
        Map: gameLevel,
        Name: name,
        AvailableCommands: availableCommands,
      } = levelFound;

      const dataSaved = await LevelStateProvider.getUserLevelState(levelID);

      const dataSavedMapped = mapDataSaved(dataSaved);
      setIsSolved(dataSavedMapped?.isSolved);

      const gameLevelMapped = JSON.parse(gameLevel);
      const commandsMapped = JSON.parse(availableCommands);

      gameDispatch({ type: gameActions.UPDATE_BOARD, payload: { board: gameLevelMapped } });
      gameDispatch({ type: gameActions.SET_LEVEL_ID, payload: { levelID } });
      gameDispatch({ type: gameActions.SET_AVAILABLE_COMMANDS, payload: { commandsMapped } });
      gameDispatch({ type: gameActions.LOAD_SAVE, payload: dataSavedMapped });
      setLevelName(name);
      setLevelLoaded(gameLevelMapped);

      if (!dataSavedMapped?.isSolved) {
        gameDispatch({ type: gameActions.SET_TIME_RUNNING, payload: { timeIsRunning: true } });
      }
    };

    fetchData();
  }, [levelID]);

  const hasSyntaxErrors = () => commandList.find((command) => {
    if (
      (command.id === commands.IF_DO.id || command.id === commands.WHILE_DO.id)
        && (!command?.condition || !command?.action)
    ) {
      consoleDispatch({
        type: consoleActions.WRITE_WARNING,
        payload: { text: messages.syntaxError },
      });
      return true;
    }
    return false;
  });

  const runOrPauseExecution = () => {
    if (!hasSyntaxErrors()) {
      gameDispatch({ type: gameActions.SWITCH_RUNNING });
    }
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
                <Timer />
              </div>
              <div className="Game-container-content">
                <Board
                  initialBoard={levelLoaded}
                  handleOpenModal={handleOpenModal}
                  isSolved={isSolved}
                />
                <CommandSelector />
              </div>
              <div className="Game-container-footer">
                <Button className="Game-button" variant="contained" color="primary" onClick={redirectBackToMenu}>
                  BACK TO MENU
                </Button>
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
            <span className="Modal-title">{`SCORE: ${score}`}</span>
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
