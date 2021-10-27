import React, { useContext } from 'react';
import './CommandSelector.scss';
import GameContext from '../../../context/GameContext';
import CommandSelected from '../CommandSelected';
import { commands, commandTypes, operationItems } from '../../models/commands';
import actions from '../../store/game/actions';

function CommandSelector() {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { commandList, operationSelected } = gameState;

  const addCommand = (command) => {
    if (operationSelected) {
      if (
        operationSelected.type === operationItems.CONDITION
        && command.type === commandTypes.VALUE
      ) {
        gameDispatch({
          type: actions.SET_OPERATION_CONDITION,
          payload: { commandKey: operationSelected.key, condition: command },
        });
        gameDispatch({ type: actions.RESET_OPERATION_SELECTED });
      } else if (
        operationSelected.type === operationItems.ACTION
        && command.type === commandTypes.MOVEMENT
      ) {
        gameDispatch({
          type: actions.SET_OPERATION_ACTION,
          payload: { commandKey: operationSelected.key, action: command },
        });
        gameDispatch({ type: actions.RESET_OPERATION_SELECTED });
      }
    } else if (command.type === commandTypes.OPERATION || command.type === commandTypes.MOVEMENT) {
      gameDispatch({ type: actions.ADD_COMMAND, payload: { command } });
    }
  };

  const removeCommand = (commandID) => {
    gameDispatch({ type: actions.REMOVE_COMMAND, payload: { commandID } });
  };

  const getSelectedCommandsList = () => commandList.map((command, key) => (
    <CommandSelected command={command} removeCommand={removeCommand} commandKey={key} />
  ));

  const getAvailableCommandsList = () => Object.keys(commands).map((command) => (
    <span
      aria-hidden="true"
      onClick={() => { addCommand(commands[command]); }}
      className="CommandSelector-command-selectable"
      key={commands[command].id}
    >
      {commands[command].display}
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
