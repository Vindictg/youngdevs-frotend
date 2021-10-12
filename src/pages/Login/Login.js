import React from 'react';
import Button from '@material-ui/core/Button';
import useAuth from '../../hooks/useAuth';

function Login() {
  const { logIn } = useAuth();

  const handleLogIn = async () => {
    logIn();
  };

  return (
    <div className="App">
      <div className="App-container">
        <div className="Login-content">
          <h1>YoungDevs</h1>
          <h3>Learning to code has never been so easy, join thousands of students learn,</h3>
          <h3>compare and have fun with others.</h3>
          <Button variant="contained" className="App-link" onClick={handleLogIn}>Google Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
