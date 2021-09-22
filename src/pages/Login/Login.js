import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { Redirect } from 'react-router-dom';
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

  onAuthStateChanged(auth, async (userAuthenticated) => {
    setUser(userAuthenticated);
  });

  const postUserAuthenticated = async () => {
    if (user) {
      try {
        await UserProvider.postUserID(user.uid);
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

  return (
    <div className="App">
      { user && <Redirect to="/game" />}
      <div className="App-header">
        <div className="Login-content">
          <h1>YoungDevs</h1>
          <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry </h3>
          <button type="button" className="Login-link" onClick={googleLogin}>Google Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
