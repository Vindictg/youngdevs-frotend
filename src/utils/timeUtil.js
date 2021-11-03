export const secondsToMinutesAndSeconds = (seconds) => {
  const minutes = Math.trunc(seconds / 60);
  const newSeconds = seconds - minutes * 60;

  return [minutes, newSeconds];
};

const zeroToTheLeft = (number) => `${String(number).length > 1 ? number : `0${number}`}`;

export const secondsToTimerLabel = (seconds) => {
  const [minutes, newSeconds] = secondsToMinutesAndSeconds(seconds);

  return `${zeroToTheLeft(minutes)}:${zeroToTheLeft(newSeconds)}`;
};

export default { secondsToMinutesAndSeconds };
