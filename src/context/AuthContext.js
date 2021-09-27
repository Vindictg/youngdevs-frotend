import React, { useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged,
} from 'firebase/auth';

import firebaseConfig from '../config/FirebaseConfig';

const AuthContext = React.createContext();

initializeApp(firebaseConfig);
const auth = getAuth();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticaded, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuthenticated) => {
      console.log(userAuthenticated);
    });
  }, []);

  const logIn = () => {
    setCurrentUser(true);
  };

  const logOut = () => {
    setCurrentUser(false);
  };

  const value = {
    logIn,
    logOut,
    isAuthenticaded,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
