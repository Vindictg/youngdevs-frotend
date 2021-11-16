import React from 'react';
import { useHistory } from 'react-router-dom';
import './LevelCard.scss';
import { Button, Typography } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

function LevelCard(props) {
  const { user } = useAuth();
  const { level, lvlState, preLvlState } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/game/${level.Level}`);
  };

  const isAvaible = () => {
    if (level.Level !== 1) {
      if (level.IsPremium && !user.isPremium) {
        return false;
      }
      return preLvlState?.IsSolved;
    }
    return true;
  };

  return (
    <Button className="LevelCard-button" onClick={handleClick} disabled={!isAvaible()}>
      <div
        className={`LevelCard-container ${
          !isAvaible() ? 'LevelCard-locked' : ''
        }`}
      >
        {level.IsPremium && !user.isPremium ? (
          <Typography className="overlap" variant="subtitle2">
            Premium
          </Typography>
        ) : (
          <></>
        )}
        <Typography className="LevelCard-text">{`LEVEL ${level.Level}`}</Typography>
        {lvlState?.Score && lvlState?.Score !== 0 ? (
          <Typography className="LevelCard-text" variant="subtitle2">
            {`Score ${lvlState?.Score}`}
          </Typography>
        ) : (
          <></>
        )}
      </div>
    </Button>
  );
}

export default LevelCard;
