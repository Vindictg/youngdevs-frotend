import axios from 'axios';

import config from '../../config/env';

const postUserID = async (userID) => {
  const body = { id: userID };
  const postUserURL = `${config.apiURL}/user?id=${userID}`;

  try {
    return await axios.post(postUserURL, JSON.stringify(body));
  } catch (error) {
    return error;
  }
};

export default {
  postUserID,
};
