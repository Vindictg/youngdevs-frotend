import React from 'react';
import './Nav.scss';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Nav = () => {
  const { logOut, user } = useAuth();
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
            { user.isAuthenticated && user.isAdmin ? <Link className="Nav-link" to="/admin">Admin Panel</Link> : <></> }
            { user.isAuthenticated ? <button type="button" className="Nav-link" onClick={handleLogOut}>Logout</button> : <></> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
