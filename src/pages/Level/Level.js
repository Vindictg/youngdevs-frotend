import React from 'react';
import './Level.scss';
import {
  Container, Card, Box, Button, Typography,
} from '@material-ui/core';

function Level() {
  return (
    <Container className="App-container Level-content">
      <Typography variant="h5">Select a Level</Typography>
      <Box className="Level-card-container">
        <Button>
          <Card className="Card-container">
            <Typography>Level1</Typography>
            <Typography>Play</Typography>
            <Typography>Score:30000</Typography>
          </Card>

        </Button>
        <Button>
          <Card className="Card-container">
            <Typography>Level1</Typography>
            <Typography>Play</Typography>
            <Typography>Score:30000</Typography>
          </Card>
        </Button>
      </Box>
      <br />
      <Button variant="contained" className="App-link" href="/">BACK TO MENU!</Button>
    </Container>
  );
}

export default Level;
