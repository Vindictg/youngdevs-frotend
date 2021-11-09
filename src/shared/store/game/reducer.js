import actions from './actions';
import { cells } from '../../models/cells';

export const getInitialGameContext = () => ({
  running: false,
  board: [],
  nextCommand: 0,
  commandList: [],
  operationSelected: null,
});

const getPlayerPosition = (board) => {
  let playerI;
  let playerJ;

  board.find((row, i) => (
    row.find((element, j) => {
      if (element === cells.PLAYER) {
        playerI = i;
        playerJ = j;
        return true;
      }
      return false;
    })
  ));

  return { i: playerI, j: playerJ };
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.MOVE:
      return { ...state, board: [...payload.board] };
    case actions.RESET:
      return {
        ...state,
        ...getInitialGameContext(),
        commandList: state.commandList,
        board: payload.board.map((row) => row.slice()),
        playerPosition: getPlayerPosition(payload.board),
      };
    case actions.RESET_COMMAND_LIST:
      return { ...state, commandList: [] };
    case actions.SWITCH_RUNNING:
      return { ...state, running: !state.running };
    case actions.NEXT_COMMAND:
      return { ...state, nextCommand: (state.nextCommand + 1) };
    case actions.UPDATE_PLAYER_POSITION:
      return { ...state, playerPosition: payload.playerPosition };
    case actions.ADD_COMMAND:
      return { ...state, commandList: [...state.commandList, { ...payload.command }] };
    case actions.REMOVE_COMMAND:
      return {
        ...state,
        commandList: state.commandList.filter((_value, key) => payload.commandID !== key),
      };
    case actions.UPDATE_BOARD:
      return {
        ...state,
        board: payload.board.map((row) => row.slice()),
        playerPosition: getPlayerPosition(payload.board),
      };
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
    case actions.SET_AVAILABLE_COMMANDS:
      return { ...state, availableCommands: payload.commandsMapped };
    case actions.ADD_TIME:
      return { ...state, time: state.time + 1 };
    case actions.SET_LEVEL_ID:
      return { ...state, levelID: payload.levelID };
    case actions.LOAD_SAVE:
      return { ...state, ...payload };
    case actions.SET_TIME_RUNNING:
      return { ...state, timeIsRunning: payload.timeIsRunning };
    default:
      throw new Error('action is not defined');
  }
};
