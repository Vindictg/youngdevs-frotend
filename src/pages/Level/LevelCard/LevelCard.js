import React from 'react';
import { useHistory } from 'react-router-dom';
import './LevelCard.scss';
import {
  Card, Box, Button, Typography,
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

function LevelCard(props) {
  const { user } = useAuth();
  const {
    level, lvlState, preLvlState,
  } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/game/${level.Level}`);
  };

  const isAvaible = () => {
    if (level.Level !== 1) {
      return preLvlState?.IsSolved;
    }
    return true;
  };

  return (
    <Button onClick={handleClick} disabled={!isAvaible()}>
      <Card>
        <Box className={`LevelCard-container ${!isAvaible() ? 'LevelCard-locked' : ''}`}>
          { level.IsPremium && !user.isPremium ? <Typography className="overlap" variant="subtitle2">Premium</Typography> : <></>}
          <Typography>
            LEVEL
            {' '}
            {level.Level}
          </Typography>
        </Box>
        {
        lvlState?.Score && lvlState?.Score !== 0 ? (
          <Typography variant="subtitle2">
            Score:
            {' '}
            {lvlState?.Score}
          </Typography>
        )
          : <></>
      }
      </Card>
    </Button>
  );
}

export default LevelCard;
