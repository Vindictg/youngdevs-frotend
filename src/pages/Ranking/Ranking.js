import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Ranking.scss';
import UserProvider from '../../providers/UserProvider';

function Ranking() {
  const [users, setUsers] = useState();

  useEffect(async () => {
    const u = await UserProvider.getRanking();
    setUsers(u);
  }, []);
  return (
    <div className="App">
      <div className="App-container">
        <div className="Ranking-content">
          <Typography variant="h3">RANKING</Typography>
          <div className="Ranking-table Home-link-content">
            { users?.map((u, i) => (
              <div>
                <Typography variant="h6" key={u.ID}>
                  {i + 1}
                  .-
                  {' '}
                  {u.Name}
                  {' '}
                  _________
                  {u.Score}
                </Typography>
                <br />
              </div>
            ))}
          </div>
          <br />
          <br />
          <Link className="App-link" to="/">BACK TO MENU</Link>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
