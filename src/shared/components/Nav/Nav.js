import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Nav = () => {
  const { logOut } = useAuth();
  const history = useHistory();

  const handleLogOut = () => {
    logOut();
    history.push('/');
  };

  return (
    <div className="App">
      <div className="Nav-header">
        <div className="Nav-content">
          <h3>YoungDevs</h3>
          <div className="Nav-content">
            <button type="button" className="Nav-link" onClick={handleLogOut}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
