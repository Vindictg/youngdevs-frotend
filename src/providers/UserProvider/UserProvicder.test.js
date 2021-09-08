import axios from 'axios';

import UserProvider from './UserProvider';
import config from '../../config/env';

jest.mock('axios');

describe('UserProvider tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when post user API returns a success response UserProvider should returns UserID data', async () => {
    // given
    const userID = '12345';
    const data = { id: userID };
    axios.post.mockResolvedValueOnce({ data });

    // when
    const result = await UserProvider.postUserID(userID);

    // then
    expect(axios.post).toHaveBeenCalledWith(`${config.apiURL}/user`, JSON.stringify(data));
    expect(result).toEqual(data);
  });

  test('when post user API returns an error response UserProvider should returns error', async () => {
    // given
    const userID = '12345';
    const data = { error: userID };
    axios.post.mockRejectedValueOnce({ data });

    // when
    try {
      await UserProvider.postUserID(userID);
    } catch (error) {
      // then
      expect(axios.post).toHaveBeenCalledWith(`${config.apiURL}/user`, JSON.stringify(data));
      expect(error).toEqual(data);
    }
  });
});
