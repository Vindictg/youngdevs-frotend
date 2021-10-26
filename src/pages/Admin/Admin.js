import React from 'react';
import './Admin.scss';
import UserPanel from './UserPanel/UserPanel';

function Admin() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="Admin-content">
          <UserPanel />
        </div>
      </div>
    </div>
  );
}

export default Admin;
