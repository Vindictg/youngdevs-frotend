import axios from 'axios';
import authHeaderProvider from '../helpers/authHeadersHelper';

import config from '../../config/env';

const postUserID = async (userID) => {
  const body = { email: userID };
  const postUserURL = `${config.apiURL}/user`;
  try {
    const result = await axios.post(postUserURL, JSON.stringify(body),
      {
        headers: await authHeaderProvider.getAuthHeaders(),
      });
    return result.data;
  } catch (error) {
    return error;
  }
};

export default {
  postUserID,
};
