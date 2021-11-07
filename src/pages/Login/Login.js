import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useAuth from '../../hooks/useAuth';
import 'react-loading-skeleton/dist/skeleton.css';

function Login() {
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line arrow-body-style
  const loader = () => {
    return (
      <div className="App">
        <div className="App-container">
          <div className="Login-content">
            <SkeletonTheme baseColor="gray" highlightColor="black" borderRadius="0.5rem">
              <Typography variant="h3">YoungDevs</Typography>
              <br />
              <Typography variant="h4"><Skeleton /></Typography>
            </SkeletonTheme>
          </div>
        </div>
      </div>
    );
  };

  const handleLogIn = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    logIn();
  };

  if (loading) {
    return (
      loader()
    );
  }
  return (
    <div className="App">
      <div className="App-container">
        <div className="Login-content">
          <Typography variant="h3">YoungDevs</Typography>
          <Typography variant="h5">Learning to code has never been so easy, join thousands of students learn,</Typography>
          <Typography variant="h5">compare and have fun with others.</Typography>
          <br />
          <Button variant="contained" className="App-link" onClick={handleLogIn}>Google Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
