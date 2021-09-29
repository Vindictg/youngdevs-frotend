import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="Home-content">
          <h3>SCORE:99999</h3>
          <h3>CURRENT LEVEL:2</h3>
          <div className="Home-link-content">
            <Link className="App-link" to="/game">PLAY</Link>
            <Link className="App-link" to="/game">LEVELS</Link>
            <Link className="App-link" to="/ranking">RANKING</Link>
            <Link className="App-link" to="/premium">¡PREMIUM!</Link>
            <Link className="App-link" to="/support">SUPPORT</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
