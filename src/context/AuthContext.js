import React, { useContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';
import { getInitialState, reducer } from '../shared/store/auth/reducer';
import { actions } from '../shared/store/auth/actions';
import firebaseConfig from '../config/FirebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
// TODO: hook personalizado
export function AuthProvider({ children }) {
  const history = useHistory();
  const [user, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuthenticated) => {
      const userPayload = {
        isAuthenticated: !!userAuthenticated,
        name: userAuthenticated?.displayName,
        email: userAuthenticated?.email,
        tokenId: userAuthenticated?.accessToken,
      };
      dispatch({ type: actions.loadUserProfile, payload: userPayload });
    });
  }, []);

  const logIn = async () => {
    signInWithPopup(auth, provider).then((r) => {
      if (r.user) {
        const userPayload = {
          isAuthenticated: true,
          name: r.user?.displayName,
          email: r.user?.email,
          tokenId: r.user?.accessToken,
        };
        dispatch({ type: actions.loadUserProfile, payload: userPayload });
        history.push('/');
      }
    }).catch((e) => console.log(e));
  };

  const logOut = () => {
    auth.signOut();
    dispatch({ type: actions.logOut });
  };

  const value = {
    logIn,
    logOut,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
