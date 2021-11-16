import React, { useEffect, useState } from 'react';
import './Level.scss';
import {
  Box, Button, Typography,
} from '@material-ui/core';
import LevelCard from './LevelCard';
import LevelProvider from '../../providers/LevelProvider';

function Level() {
  const [levels, setLevels] = useState([]);
  const [levelStates, setLevelState] = useState([]);

  useEffect(async () => {
    const lvls = await LevelProvider.getAll();
    const lvlState = await LevelProvider.getAllLevelState();
    setLevels(lvls);
    setLevelState(lvlState);
  }, []);

  return (
    <div className="App-container">
      <div className="Container">
        <Typography className="Generic-title" variant="h5">Select a Level</Typography>
        <Box className="Level-card-container">
          { levels?.map((l) => (
            <LevelCard
              key={l.ID}
              level={l}
              lvlState={levelStates?.find((ls) => ls.LevelID === l.Level)}
              preLvlState={levelStates?.find((ls) => ls.LevelID === l.Level - 1)}
            />
          ))}
        </Box>
        <Button variant="contained" className="App-link" href="/">BACK TO MENU</Button>
      </div>
    </div>
  );
}

export default Level;
