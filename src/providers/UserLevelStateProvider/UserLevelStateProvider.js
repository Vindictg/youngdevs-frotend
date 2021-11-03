import axios from 'axios';
import authHeaderProvider from '../../shared/auth/authHeadersHelper';

import config from '../../config/env';

const getUserLevelState = async (levelID) => {
  const getUserLevelStateURL = `${config.apiURL}/level/state/${levelID}`;
  try {
    const result = await axios.get(getUserLevelStateURL,
      {
        headers: await authHeaderProvider.getAuthHeaders(),
      });
    return result.data;
  } catch (error) {
    return error;
  }
};

const updateUserLevelState = async (levelState) => {
  const putUserLevelStateURL = `${config.apiURL}/level/state`;
  try {
    const result = await axios.put(putUserLevelStateURL, levelState,
      {
        headers: await authHeaderProvider.getAuthHeaders(),
      });
    return result.data;
  } catch (error) {
    return error;
  }
};

export default {
  getUserLevelState,
  updateUserLevelState,
};
