import React from 'react';
import { Link } from 'react-router-dom';
import './Ranking.scss';

function Ranking() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="Ranking-content">
          <h1>RANKING</h1>
          <div className="Ranking-table Home-link-content">
            <h4>1.- Belen _______________________999</h4>
            <h4>2.- Miguel ______________________998</h4>
            <h4>3.- Jose ________________________997</h4>
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
