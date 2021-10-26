import React from 'react';
import './Level.scss';
import {
  Container, Box, Button, Typography,
} from '@material-ui/core';
import LevelCard from './LevelCard';

function Level() {
  return (
    <Container className="App-container Level-content">
      <Typography variant="h5">Select a Level</Typography>
      <Box className="Level-card-container">
        <LevelCard level={1} isPremium={false} isPreviousSolved />
        <LevelCard level={2} isPremium={false} isPreviousSolved={false} />
        <LevelCard level={3} isPremium />
      </Box>
      <br />
      <Button variant="contained" className="App-link" href="/">BACK TO MENU!</Button>
    </Container>
  );
}

export default Level;
