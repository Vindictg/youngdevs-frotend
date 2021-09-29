import { actions } from './actions';

export const getInitialState = (userAuthenticated) => ({
  isAuthenticated: !!userAuthenticated,
  name: userAuthenticated?.displayName,
  email: userAuthenticated?.email,
  tokenId: userAuthenticated?.accessToken,
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
