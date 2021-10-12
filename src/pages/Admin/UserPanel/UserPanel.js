import React from 'react';
import './UserPanel.scss';
import UserPanelRow from './UserPanelRow';
import { user } from '../../../shared/models/user';

function UserPanel() {
  const users = [user, user];
  return (
    <div className="App">
      <div className="App-container">
        <div className="Admin-content">
          <table className="table">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            { users.map((u) => <UserPanelRow user={u} key={u.id + 1} />)}
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
