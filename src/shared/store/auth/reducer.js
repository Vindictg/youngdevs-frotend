import { actions } from './actions';

export const getInitialState = () => ({
  isAuthenticated: false,
  name: '',
  email: '',
  tokenId: '',
});

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.loadUserProfile:
      return {
        isAuthenticated: payload.isAuthenticated,
        name: payload.name,
        email: payload.email,
        tokenId: payload.tokenId,
      };
    case actions.logOut:
      return { ...state, isAuthenticated: false };
    default:
      throw new Error('action is not defined');
  }
};

export default reducer;
