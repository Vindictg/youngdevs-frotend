import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
          <Link className="Nav-link" to="/">YoungDevs</Link>
          <div className="Nav-content">
            <button type="button" className="Nav-link" onClick={handleLogOut}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
