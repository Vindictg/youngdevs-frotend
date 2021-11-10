import React, { useContext, useEffect } from 'react';
import './CommandSelector.scss';
import GameContext from '../../../context/GameContext';
import CommandSelected from '../CommandSelected';
import { commands, commandTypes, operationItems } from '../../models/commands';
import actions from '../../store/game/actions';

function CommandSelector() {
  let selectorEnd = null;
  const { gameState, gameDispatch } = useContext(GameContext);
  const { commandList, operationSelected, availableCommands } = gameState;

  const scrollToBottom = () => {
    selectorEnd.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [commandList]);

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
    <CommandSelected
      command={command}
      removeCommand={removeCommand}
      commandKey={key}
      key={(Math.random() + 1).toString(36).substring(7)}
    />
  ));

  const getAvailableCommandsList = () => {
    const commandsKeys = Object.keys(commands);
    const commandsKeysFilter = commandsKeys.filter((commandKey) => availableCommands?.find(
      (availableCommand) => (
        availableCommand === commands[commandKey].id
      ),
    ) !== undefined);

    return commandsKeysFilter.map((command) => (
      <span
        aria-hidden="true"
        onClick={() => { addCommand(commands[command]); }}
        className="CommandSelector-command-selectable"
        key={commands[command]?.id}
      >
        {commands[command]?.display}
      </span>
    ));
  };

  return (
    <div className="CommandSelector-container">
      <div className="CommandSelector-column">
        {getAvailableCommandsList()}
      </div>
      <div className="CommandSelector-column">
        {getSelectedCommandsList()}
        <span
          className="Console-end"
          ref={(selectorEndRef) => { selectorEnd = selectorEndRef; }}
        />
      </div>
    </div>
  );
}

export default CommandSelector;
