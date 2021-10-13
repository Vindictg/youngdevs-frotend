import axios from 'axios';
import authHeaderProvider from '../../shared/auth/authHeadersHelper';

import config from '../../config/env';

const getLevel = async (levelID) => {
  const postUserURL = `${config.apiURL}/level?level=${levelID}`;
  try {
    const result = await axios.get(postUserURL, undefined,
      {
        headers: await authHeaderProvider.getAuthHeaders(),
      });

    return result.data;
  } catch (error) {
    return error;
  }
};

export default {
  getLevel,
};
