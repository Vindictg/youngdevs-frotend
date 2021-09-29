import React from 'react';
import './Premium.scss';

function Premium() {
  const handlePremium = () => {
    console.log('"Premium maestro"');
  };

  return (
    <div className="App">
      <div className="App-container">
        <div className="Premium-content">
          <h1>PREMIUM!</h1>
          <h3>With one single payment and you will get all to continue your journey,</h3>
          <h3>power up your career!</h3>
          <br />
          <button type="button" className="Premium-link" onClick={handlePremium}>MERCADOPAGO</button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
