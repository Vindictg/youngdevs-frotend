import React, { useEffect, useState } from 'react';
import './Level.scss';
import {
  Container, Box, Button, Typography,
} from '@material-ui/core';
import LevelCard from './LevelCard';
import LevelProvider from '../../providers/LevelProvider';

function Level() {
  const [levels, setLevels] = useState([]);
  const [levelStates, setLevelState] = useState([]);

  useEffect(async () => {
    // eslint-disable-next-line max-len
    const lvls = await LevelProvider.getAll();
    const lvlState = await LevelProvider.getAllLevelState();
    setLevels(lvls);
    setLevelState(lvlState);
  }, []);

  return (
    <Container className="App-container Level-content">
      <Typography variant="h5">Select a Level</Typography>
      <Box className="Level-card-container">
        { levels?.map((l) => (
          // eslint-disable-next-line max-len
          <LevelCard
            key={l.ID}
            level={l}
            lvlState={levelStates?.find((ls) => ls.LevelID === l.Level)}
            preLvlState={levelStates?.find((ls) => ls.LevelID === l.Level - 1)}
          />
        ))}
      </Box>
      <br />
      <Button variant="contained" className="App-link" href="/">BACK TO MENU!</Button>
    </Container>
  );
}

export default Level;
