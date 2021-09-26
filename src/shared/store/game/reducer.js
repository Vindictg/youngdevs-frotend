import actions from './actions';

const initialBoard = [
  [1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const initialPlayerPosition = { i: 0, j: 0 };

export const getInitialGameContext = () => {
  const boardCopy = initialBoard.map((row) => row.slice());

  return ({
    running: false,
    board: boardCopy,
    playerPosition: initialPlayerPosition,
    nextMovement: 0,
    commandList: [],
  });
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.MOVE:
      return { ...state, board: [...payload.board] };
    case actions.RESET:
      return { ...getInitialGameContext() };
    case actions.SWITCH_RUNNING:
      return { ...state, running: !state.running };
    case actions.NEXT_COMMAND:
      return { ...state, nextMovement: (state.nextMovement + 1) };
    case actions.UPDATE_PLAYER_POSITION:
      return { ...state, playerPosition: payload.playerPosition };
    case actions.ADD_COMMAND:
      return { ...state, commandList: [...state.commandList, payload.command] };
    case actions.REMOVE_COMMAND:
      return {
        ...state,
        commandList: state.commandList.filter((_value, key) => payload.commandID !== key),
      };
    default:
      throw new Error('action is not defined');
  }
};
