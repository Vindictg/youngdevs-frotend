import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const { logIn } = useAuth();
  const history = useHistory();
  const handleLogIn = () => {
    logIn();
    history.push('/game');
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="Login-content">
          <h1>YoungDevs</h1>
          <h3>Learning to code has never been so easy, join thousands of students learn,</h3>
          <h3>compare and have fun with others.</h3>
          <button type="button" className="Login-link" onClick={handleLogIn}>Google Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
