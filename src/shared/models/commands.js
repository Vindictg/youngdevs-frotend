export const commandTypes = {
  MOVEMENT: 0,
  OPERATION: 1,
  VALUE: 2,
};

export const operationItems = {
  CONDITION: 0,
  ACTION: 1,
};

export const commands = {
  UP: {
    id: 0, display: 'UP', type: commandTypes.MOVEMENT,
  },
  DOWN: {
    id: 1, display: 'DOWN', type: commandTypes.MOVEMENT,
  },
  RIGHT: {
    id: 2, display: 'RIGHT', type: commandTypes.MOVEMENT,
  },
  LEFT: {
    id: 3, display: 'LEFT', type: commandTypes.MOVEMENT,
  },
  IF_DO: {
    id: 4, display: 'IF DO', type: commandTypes.OPERATION,
  },
  WHILE_DO: {
    id: 5, display: 'WHILE DO', type: commandTypes.OPERATION,
  },
  WALL_CELL: {
    id: 6, display: 'WALL CELL', type: commandTypes.VALUE,
  },
  EMPTY_CELL: {
    id: 7, display: 'EMPTY CELL', type: commandTypes.VALUE,
  },
};

export default { commands, commandTypes, operationItems };
