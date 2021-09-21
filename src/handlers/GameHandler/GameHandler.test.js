import GameHandler from './GameHandler';
import { movements } from './entities';

describe('GameHandler tests', () => {
  test('when movement is DOWN then player should move one row below', async () => {
    // given
    const movement = movements.DOWN;
    const initialBoard = [
      [1, 0],
      [0, 0],
    ];
    const playerPosition = { i: 0, j: 0 };

    const expectedBoard = [
      [0, 0],
      [1, 0],
    ];
    const expectedPlayerPosition = { i: 1, j: 0 };

    // when
    const result = GameHandler.doMovement(initialBoard, movement, playerPosition);

    // then
    expect(result.board).toEqual(expectedBoard);
    expect(result.playerPosition).toEqual(expectedPlayerPosition);
  });

  test('when movement is RIGHT then player should move one column to the right', async () => {
    // given
    const movement = movements.RIGHT;
    const initialBoard = [
      [1, 0],
      [0, 0],
    ];
    const playerPosition = { i: 0, j: 0 };

    const expectedBoard = [
      [0, 1],
      [0, 0],
    ];
    const expectedPlayerPosition = { i: 0, j: 1 };

    // when
    const result = GameHandler.doMovement(initialBoard, movement, playerPosition);

    // then
    expect(result.board).toEqual(expectedBoard);
    expect(result.playerPosition).toEqual(expectedPlayerPosition);
  });

  test('when movement is a invalid number then doMovement should returns an error', async () => {
    // given
    const movement = 999;
    const expectedError = 'movement not allowed';

    // when
    try {
      GameHandler.doMovement([], movement, {});
    } catch (error) {
      // then
      expect(error.message).toEqual(expectedError);
    }
  });
});
