import GameHandler from './GameHandler';

describe('GameHandler tests', () => {
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
