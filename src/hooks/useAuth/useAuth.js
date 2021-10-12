import { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';
import { getInitialState, reducer } from '../../shared/store/auth/reducer';
import { actions } from '../../shared/store/auth/actions';
import firebaseConfig from '../../config/firebase';
import UserProvider from '../../providers/UserProvider';

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function useAuth() {
  const history = useHistory();
  const [user, dispatch] = useReducer(reducer, getInitialState(auth.currentUser));
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuthenticated) => {
      const userPayload = {
        isAuthenticated: !!userAuthenticated,
        name: userAuthenticated?.displayName,
        email: userAuthenticated?.email,
        authProviderUserId: userAuthenticated?.uid,
        tokenId: userAuthenticated?.accessToken,
      };

      if (userAuthenticated) {
        const ur = await UserProvider.getUserData();
        userPayload.isPremium = ur.IsPremium;
        userPayload.isAdmin = ur.IsAdmin;
        userPayload.isLocked = ur.IsLocked;
        userPayload.id = ur.ID;
      }

      dispatch({ type: actions.loadUserProfile, payload: userPayload });
      setAuthLoading(false);
    });
  }, []);

  const logIn = async () => {
    signInWithPopup(auth, provider).then(async (r) => {
      if (r.user) {
        // eslint-disable-next-line max-len
        const ur = await UserProvider.getUserData();
        const userPayload = {
          isAuthenticated: true,
          name: r.user?.displayName,
          email: r.user?.email,
          authProviderUserId: r.user?.uid,
          tokenId: r.user?.accessToken,
          isPremium: ur.IsPremium,
          isAdmin: ur.IsAdmin,
          isLocked: ur.IsLocked,
          id: ur.ID,
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

  return {
    logIn,
    logOut,
    user,
    authLoading,
  };
}

export default useAuth;
