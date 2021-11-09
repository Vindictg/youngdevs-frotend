import React, { useEffect, useContext, useState } from 'react';
import { secondsToTimerLabel } from '../../../utils/timeUtil';
import gameActions from '../../store/game/actions';
import GameContext from '../../../context/GameContext';

import './Timer.scss';

function Timer() {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { time, timeIsRunning } = gameState;

  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (timeIsRunning) {
      setTimeout(() => {
        setSeconds(seconds + 1);
        gameDispatch({ type: gameActions.ADD_TIME });
      }, 1000);
    }
  }, [seconds, timeIsRunning]);

  return (
    <span className="Game-container-header-timer">{secondsToTimerLabel(time)}</span>
  );
}

export default Timer;
