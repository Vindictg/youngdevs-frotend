import React, { useContext } from 'react';

import GameContext from '../../../context/GameContext';
import { commands } from '../../models/commands';
import actions from '../../store/game/actions';

function CommandSelector() {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { commandList } = gameState;

  const addCommand = (command) => {
    gameDispatch({ type: actions.ADD_COMMAND, payload: { command } });
  };

  const removeCommand = (commandID) => {
    gameDispatch({ type: actions.REMOVE_COMMAND, payload: { commandID } });
  };

  const getSelectedCommandsList = () => commandList.map((command, key) => {
    const commandFound = Object.keys(commands)
      .find((commandKey) => commands[commandKey].id === command);

    return (
      <span
        aria-hidden="true"
        onClick={() => { removeCommand(key); }}
        className="CommandSelector-command-selectable"
        key={(Math.random() + 1).toString(36).substring(7)}
      >
        {commands[commandFound].display}
      </span>
    );
  });

  const getAvailableCommandsList = () => Object.keys(commands).map((command) => (
    <span
      aria-hidden="true"
      onClick={() => { addCommand(commands[command].id); }}
      className="CommandSelector-command-selectable"
      key={commands[command].id}
    >
      {command}
    </span>
  ));

  return (
    <div className="CommandSelector-container">
      <div className="CommandSelector-column">
        {getAvailableCommandsList()}
      </div>
      <div className="CommandSelector-column">
        {getSelectedCommandsList()}
      </div>
    </div>
  );
}

export default CommandSelector;
