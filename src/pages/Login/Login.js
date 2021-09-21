import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';

import firebaseConfig from '../../config/FirebaseConfig';
import UserProvider from '../../providers/UserProvider';

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function Login() {
  const [user, setUser] = useState(auth.currentUser);
  const [userID, setUserID] = useState(null);

  onAuthStateChanged(auth, async (userAuthenticated) => {
    setUser(userAuthenticated);
  });

  const postUserAuthenticated = async () => {
    if (user) {
      try {
        const userProviderResponse = await UserProvider.postUserID(user.uid);
        setUserID(userProviderResponse.id);
      } catch (error) {
        // TODO: handle error
      }
    }
  };

  useEffect(() => {
    postUserAuthenticated();
  }, [user]);

  const googleLogin = () => {
    signInWithRedirect(auth, provider);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      <header className="App-header">
        {
          user
            ? (
              <>
                <div>{ user.email }</div>
                <div>{ userID }</div>
                <button type="button" className="App-link" onClick={logout}>Logout</button>
              </>
            )
            : (
              <button type="button" className="App-link" onClick={googleLogin}>Google Login</button>
            )
        }
      </header>
    </div>
  );
}

export default Login;
