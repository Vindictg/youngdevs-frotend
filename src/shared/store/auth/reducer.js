import { actions } from './actions';

export const getInitialState = (userAuthenticated) => ({
  isAuthenticated: !!userAuthenticated,
  name: userAuthenticated?.displayName,
  email: userAuthenticated?.email,
  avatar: userAuthenticated?.avatar,
  tokenId: userAuthenticated?.accessToken,
  authProviderUserId: userAuthenticated?.uid,
  isPremium: userAuthenticated?.isPremium,
  isAdmin: userAuthenticated?.isAdmin,
  isLocked: !!userAuthenticated?.isLocked,
  id: userAuthenticated?.id,
  score: userAuthenticated?.score,
});

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.loadUserProfile:
      return {
        isAuthenticated: payload.isAuthenticated,
        name: payload.name,
        email: payload.email,
        avatar: payload?.avatar,
        tokenId: payload.tokenId,
        authProviderUserId: payload.uid,
        isPremium: payload.isPremium,
        isAdmin: payload.isAdmin,
        isLocked: payload.isLocked,
        id: payload.id,
        score: payload.score,
        currentLevel: payload.currentLevel,
      };
    case actions.logOut:
      return { ...state, isAuthenticated: false };
    default:
      throw new Error('action is not defined');
  }
};

export default reducer;
