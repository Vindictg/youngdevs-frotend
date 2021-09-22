import React from 'react';
import {
  getAuth,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../config/FirebaseConfig';

initializeApp(firebaseConfig);

const auth = getAuth();

const Nav = (props, userName) => {
  const logout = () => {
    auth.signOut();

    // eslint-disable-next-line react/prop-types
    props.props.history.push('/');
  };

  return (
    <div className="App">
      <div className="Nav-header">
        <div className="Nav-content">
          <h3>YoungDevs</h3>
          <div className="Nav-content">
            <h5>{userName}</h5>
            <button type="button" className="Nav-link" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
