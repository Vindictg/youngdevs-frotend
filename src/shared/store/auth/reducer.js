import actions from './actions';

const initialState = {
  isAuthenticated: false,
  name: '',
  email: '',
  tokenId: '',
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.loadUserProfile:
      return { ...state, payload };
    case actions.logOut:
      return { ...state, user: initialState };
    default:
      throw new Error('action is not defined');
  }
};

export default reducer;
