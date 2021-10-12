import axios from 'axios';
import authHeaderProvider from '../../shared/auth/authHeadersHelper';

import config from '../../config/env';

const getUserData = async () => {
  const postUserURL = `${config.apiURL}/user`;
  try {
    const result = await axios.get(postUserURL,
      {
        headers: await authHeaderProvider.getAuthHeaders(),
      });
    return result.data;
  } catch (error) {
    return error;
  }
};

export default {
  getUserData,
};
