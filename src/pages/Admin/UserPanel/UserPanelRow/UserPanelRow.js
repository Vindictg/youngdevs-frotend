import React from 'react';
import './UserPanelRow.scss';

function UserPanelRow(props) {
  const { user } = props;
  const handleAction = () => {
    const action = 'ada';
    switch (action) {
      case 'Premium':
        console.log(action);
        break;
      case 'Lock':
        console.log(action);
        break;
      default:
        console.log(action);
        break;
    }
  };

  return (
    <tr>
      <td>{user?.email}</td>
      <td className="table-content">
        <button type="button" onClick={handleAction}>{user.isPremium ? 'REMOVE PREMIUM' : 'PREMIUM'}</button>
        <button type="button" onClick={handleAction}>{user.isLock ? 'UNLOCK' : 'LOCK'}</button>
        <button type="button" onClick={handleAction}>RESET</button>
      </td>
    </tr>
  );
}

export default UserPanelRow;
