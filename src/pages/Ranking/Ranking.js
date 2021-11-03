// eslint-disable-next-line object-curly-newline
import { Typography, TableRow, TableHead, TableBody, TableCell, TableContainer } from '@material-ui/core';
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
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><Typography variant="h5">Position</Typography></TableCell>
                  <TableCell align="center"><Typography variant="h5">Username</Typography></TableCell>
                  <TableCell align="center"><Typography variant="h5">Score</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { users?.map((u, i) => (
                  <TableRow key={u.ID}>
                    { i < 3 ? <TableCell align="center"><div className="Ranking-top">{i + 1}</div></TableCell> : <TableCell align="center">{i + 1}</TableCell> }
                    { i < 3 ? <TableCell align="center"><div className="Ranking-top">{u.Name}</div></TableCell> : <TableCell align="center">{u.Name}</TableCell> }
                    { i < 3 ? <TableCell align="center"><div className="Ranking-top">{u.Score}</div></TableCell> : <TableCell align="center">{u.Score}</TableCell> }
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
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
