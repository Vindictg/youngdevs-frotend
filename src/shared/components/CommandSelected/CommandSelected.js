import React, { useContext } from 'react';
import { commandTypes, operationItems } from '../../models/commands';
import GameContext from '../../../context/GameContext';
import gameActions from '../../store/game/actions';

import './CommandSelected.scss';

function CommandSelector({ command, removeCommand, commandKey }) {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { operationSelected } = gameState;

  const setAsSelected = (operationItem) => {
    if (operationSelected?.key === commandKey && operationSelected?.type === operationItem) {
      gameDispatch({ type: gameActions.RESET_OPERATION_SELECTED });
    } else {
      gameDispatch({
        type: gameActions.UPDATE_OPERATION_SELECTED,
        payload: {
          operationSelected: {
            key: commandKey,
            type: operationItem,
          },
        },
      });
    }
  };

  const renderOperation = () => {
    const [commandCondition, commandAction] = command?.display.split(' ');

    const isOperationSelected = operationSelected?.key === commandKey;
    const actionSelected = isOperationSelected && operationSelected?.type === operationItems.ACTION;
    const conditionSelected = isOperationSelected
      && operationSelected?.type === operationItems.CONDITION;

    return (
      <div className="CommandSelector-operation-selectable-container" key={(Math.random() + 1).toString(36).substring(7)}>
        <span
          aria-hidden="true"
          onClick={() => { removeCommand(commandKey); }}
          className="CommandSelector-operation-selectable"
        >
          {commandCondition}
        </span>
        <span
          aria-hidden="true"
          onClick={() => { setAsSelected(operationItems.CONDITION); }}
          className={`CommandSelector-operation-selectable-child${conditionSelected ? '--focus' : ''}`}
        >
          {command?.condition?.display}
        </span>
        <span className="CommandSelector-operation-selectable">{commandAction}</span>
        <span
          aria-hidden="true"
          onClick={() => { setAsSelected(operationItems.ACTION); }}
          className={`CommandSelector-operation-selectable-child${actionSelected ? '--focus' : ''}`}
        >
          {command?.action?.display}
        </span>
      </div>
    );
  };

  const renderMovement = () => (
    <span
      aria-hidden="true"
      onClick={() => { removeCommand(commandKey); }}
      className="CommandSelector-command-selectable"
      key={(Math.random() + 1).toString(36).substring(7)}
    >
      {command.display}
    </span>
  );

  const renderCommandByType = () => {
    switch (command.type) {
      case commandTypes.MOVEMENT:
        return renderMovement();
      case commandTypes.OPERATION:
        return renderOperation();
      default:
        return renderMovement();
    }
  };

  return (
    renderCommandByType()
  );
}

export default CommandSelector;
