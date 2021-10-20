import React from 'react';
import './UserPanelRow.scss';
import {
  TableCell, TableRow, Button,
} from '@material-ui/core';
import UserProvider from '../../../../providers/UserProvider';

function UserPanelRow(props) {
  const { user } = props;

  const handleAction = async (action) => {
    if (action !== 'Reset') {
      switch (action) {
        case 'Premium':
          user.IsPremium = !user.IsPremium;
          break;
        case 'Admin':
          user.IsAdmin = !user.IsAdmin;
          break;
        case 'Lock':
          user.IsLocked = !user.IsLocked;
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
        <Button variant="contained" className="button" onClick={() => handleAction('Admin')}>{user?.IsAdmin ? 'REMOVE ADMIN' : 'ADMIN'}</Button>
        <Button variant="contained" className="button" color="primary" onClick={() => handleAction('Premium')}>{user?.IsPremium ? 'REMOVE PREMIUM' : 'PREMIUM'}</Button>
        <Button variant="contained" className="button" color="default" onClick={() => handleAction('Lock')}>{user?.IsLocked ? 'UNLOCK' : 'LOCK'}</Button>
        <Button variant="contained" className="button" color="secondary" onClick={() => handleAction('Reset')}>RESET</Button>
      </TableCell>
    </TableRow>
  );
}

export default UserPanelRow;
