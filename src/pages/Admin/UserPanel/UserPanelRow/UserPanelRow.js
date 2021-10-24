import React, { useState } from 'react';
import './UserPanelRow.scss';
import {
  TableCell, TableRow, Button,
} from '@material-ui/core';
import UserProvider from '../../../../providers/UserProvider';

function UserPanelRow(props) {
  const { user } = props;
  const [isPremium, setPremium] = useState(user?.IsPremium);
  const [isLocked, setLock] = useState(user?.IsLocked);
  const [isAdmin, setAdmin] = useState(user?.IsAdmin);

  const handleAction = async (action) => {
    if (action !== 'Reset') {
      switch (action) {
        case 'Premium':
          user.IsPremium = !isPremium;
          setPremium(user.isPremium);
          break;
        case 'Admin':
          user.IsAdmin = !isAdmin;
          setAdmin(user.IsAdmin);
          break;
        case 'Lock':
          user.IsLocked = !isLocked;
          setLock(user.IsLocked);
          break;
        default:
          console.log(action);
          break;
      }
      await UserProvider.updateUser(user);
    } else {
      await UserProvider.reset(user.ID);
    }
  };

  return (
    <TableRow
      key={user?.ID}
    >
      <TableCell component="th" scope="row">
        {user?.Email}
      </TableCell>
      <TableCell align="right">
        { !isLocked ? <Button variant="contained" className="button" onClick={() => handleAction('Admin')}>{isAdmin ? 'REMOVE ADMIN' : 'ADMIN'}</Button> : <></> }
        <Button variant="contained" className="button" color="primary" onClick={() => handleAction('Premium')}>{isPremium ? 'REMOVE PREMIUM' : 'PREMIUM'}</Button>
        { !isAdmin ? <Button variant="contained" className="button" color="default" onClick={() => handleAction('Lock')}>{isLocked ? 'UNLOCK' : 'LOCK'}</Button> : <></> }
        <Button variant="contained" className="button" color="secondary" onClick={() => handleAction('Reset')}>RESET</Button>
      </TableCell>
    </TableRow>
  );
}

export default UserPanelRow;
