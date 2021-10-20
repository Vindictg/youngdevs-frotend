import actions from './actions';

const messageTypes = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
};

export const getInitialConsoleContext = () => ({ messages: [] });

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.WRITE_INFO:
      return {
        messages: [
          ...state.messages,
          { text: payload.text, type: messageTypes.INFO },
        ],
      };
    case actions.WRITE_WARNING:
      return {
        messages: [
          ...state.messages,
          { text: payload.text, type: messageTypes.WARNING },
        ],
      };
    case actions.WRITE_SUCCESS:
      return {
        messages: [
          ...state.messages,
          { text: payload.text, type: messageTypes.SUCCESS },
        ],
      };
    default:
      throw new Error('action is not defined');
  }
};
