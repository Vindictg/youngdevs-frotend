import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../../shared/components/Nav';

function Home() {
  return (
    <div className="App">
      <Nav />
      <div className="App-container">
        <div className="Home-content">
          <h3>SCORE:99999</h3>
          <h3>CURRENT LEVEL:2</h3>
          <div className="Home-link-content">
            <Link className="Home-link" to="/game">PLAY</Link>
            <Link className="Home-link" to="/game">LEVELS</Link>
            <Link className="Home-link" to="/game">RANKING</Link>
            <Link className="Home-link" to="/game">¡PREMIUM!</Link>
            <Link className="Home-link" to="/game">SUPPORT</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
