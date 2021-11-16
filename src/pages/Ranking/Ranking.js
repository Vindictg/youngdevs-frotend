import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Ranking.scss';
import UserProvider from '../../providers/UserProvider';

function Ranking() {
  const [users, setUsers] = useState();

  useEffect(async () => {
    const u = await UserProvider.getRanking();
    setUsers(u);
  }, []);

  return (
    <div className="App-container">
      <div className="Container">
        <div className="Ranking-content">
          <Typography className="Generic-title" variant="h3">RANKING</Typography>
          <div className="Ranking-table Home-link-content">
            { users?.map((u, i) => (
              <div className="UserRanking" key={u.ID}>
                <span className="UserRanking__number">{i + 1}</span>
                <span className="UserRanking__name">{u.Name}</span>
                <span className="UserRanking__space" />
                <span className="UserRanking__score">{u.Score}</span>
              </div>
            ))}
          </div>
          <Button variant="contained" className="App-link" href="/">BACK TO MENU</Button>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
