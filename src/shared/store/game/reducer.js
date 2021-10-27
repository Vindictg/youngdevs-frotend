import actions from './actions';

const initialPlayerPosition = { i: 0, j: 0 };

export const getInitialGameContext = () => ({
  running: false,
  board: [],
  playerPosition: initialPlayerPosition,
  nextMovement: 0,
  commandList: [],
  operationSelected: null,
});

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.MOVE:
      return { ...state, board: [...payload.board] };
    case actions.RESET:
      return {
        ...getInitialGameContext(),
        commandList: state.commandList,
        board: payload.board.map((row) => row.slice()),
      };
    case actions.RESET_COMMAND_LIST:
      return { ...state, commandList: [] };
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
    case actions.UPDATE_BOARD:
      return { ...state, board: payload.board.map((row) => row.slice()) };
    case actions.UPDATE_OPERATION_SELECTED:
      return { ...state, operationSelected: { ...payload.operationSelected } };
    case actions.RESET_OPERATION_SELECTED:
      return { ...state, operationSelected: null };
    case actions.SET_OPERATION_ACTION: {
      const newState = {
        ...state,
        commandList: [...state.commandList],
      };
      newState.commandList[payload.commandKey].action = payload.action;
      return newState;
    }
    case actions.SET_OPERATION_CONDITION: {
      const newState = {
        ...state,
        commandList: [...state.commandList],
      };
      newState.commandList[payload.commandKey].condition = payload.condition;
      return newState;
    }
    default:
      throw new Error('action is not defined');
  }
};
