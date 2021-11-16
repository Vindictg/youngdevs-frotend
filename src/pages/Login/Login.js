import React from 'react';
import { Button, Typography } from '@material-ui/core';
import useAuth from '../../hooks/useAuth';

import './Login.scss';

function Login() {
  const { logIn } = useAuth();

  const handleLogIn = async () => {
    logIn();
  };

  return (
    <div className="App">
      <div className="App-container">
        <div className="Login-content">
          <Typography className="Login-title white-text generic-padding-bottom" variant="h3">YoungDevs</Typography>
          <Typography className="white-text" variant="h5">Learning to code has never been so easy, join thousands of students learn,</Typography>
          <Typography className="white-text generic-padding-bottom" variant="h5">compare and have fun with others.</Typography>
          <br />
          <Button variant="contained" className="App-link" onClick={handleLogIn}>Google Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
