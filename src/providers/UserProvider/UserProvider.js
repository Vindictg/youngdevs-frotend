import axios from 'axios';

import config from '../../config/env';

const postUserID = async (userID) => {
  const body = { id: userID };
  const postUserURL = `${config.apiURL}/user`;

  try {
    const result = await axios.post(postUserURL, JSON.stringify(body));

    return result.data;
  } catch (error) {
    return error;
  }
};

export default {
  postUserID,
};
