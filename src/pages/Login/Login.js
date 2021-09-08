import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';

import firebaseConfig from '../../config/FirebaseConfig';
import UserProvider from '../../providers/UserProvider';

import './Login.scss';

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, async (userAuthenticated) => {
    setUser(userAuthenticated);
    if (userAuthenticated) {
      try {
        await UserProvider.postUserID(userAuthenticated.uid);
      } catch (error) {
        console.error({ error });
      }
    }
  });

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

export default App;
