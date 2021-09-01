import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from "./FirebaseConfig";

import './App.css';

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const googleLogin = () => {
    signInWithRedirect(auth, provider);
  }

  const logout = () => {
    auth.signOut();
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          user ?
          (
            <>
              <div>{ user.email }</div>
              <button
                className="App-link"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )
          :
          (
            <button
              className="App-link"
              onClick={googleLogin}
            >
              Google Login
            </button>
          )
        }
      </header>
    </div>
  );
}

export default App;
