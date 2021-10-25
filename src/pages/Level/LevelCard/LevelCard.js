import React from 'react';
import { useHistory } from 'react-router-dom';
import './LevelCard.scss';
import {
  Card, Box, Button, Typography,
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

function LevelCard(props) {
  const { user } = useAuth();
  const { level, isPremium, isPreviousSolved } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push('/game');
  };
  return (
    <Button onClick={handleClick} disabled={(!user.isPremium && isPremium) || !isPreviousSolved}>
      <Card>
        <Box className={`LevelCard-container ${!isPreviousSolved ? 'LevelCard-locked' : ''}`}>
          { isPremium && !user.isPremium ? <Typography className="overlap" variant="subtitle2">Premium</Typography> : <></>}
          <Typography>
            LEVEL
            {' '}
            {level}
          </Typography>
        </Box>
        <Typography variant="subtitle2">Score:</Typography>
      </Card>
    </Button>
  );
}

export default LevelCard;
