import React from 'react';
import './Home.scss';
import { Button, Typography } from '@material-ui/core';
import useAuth from '../../hooks/useAuth';

function Home() {
  const { user } = useAuth();
  return (
    <div>
      <div className="App">
        <div className="App-container">
          <div className="Home-content">
            <Typography variant="h5">SCORE:99999</Typography>
            <Typography variant="h5">CURRENT LEVEL:2</Typography>
            <br />
            <div className="Home-link-content">
              <Button disabled={user.isLocked} variant="contained" className="App-link" href="/game">PLAY</Button>
              <Button disabled={user.isLocked} variant="contained" className="App-link" href="/levels">LEVELS</Button>
              <Button disabled={user.isLocked} variant="contained" className="App-link" href="/ranking">RANKING</Button>
              <Button disabled={user.isLocked} variant="contained" className="App-link" href="/premium">¡PREMIUM!</Button>
              <Button variant="contained" className="App-link" href="/support">SUPPORT</Button>
            </div>
          </div>
          <div>
            {
              user.isLocked ? <Typography className="Home-locked" variant="subtitle1">Your user is disabled, for any doubts please contact support</Typography> : <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
