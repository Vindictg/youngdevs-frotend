import actions from './actions';

const messageTypes = {
  INFO: 'info',
  WARNING: 'warning',
};

export const getInitialConsoleContext = () => ({ messages: [{ text: 'prueba', type: messageTypes.INFO }] });

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
    default:
      throw new Error('action is not defined');
  }
};
