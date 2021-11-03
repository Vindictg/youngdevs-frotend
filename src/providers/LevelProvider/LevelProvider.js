import axios from 'axios';
import authHeaderProvider from '../../shared/auth/authHeadersHelper';

import config from '../../config/env';

const getLevel = async (levelID) => {
  const postUserURL = `${config.apiURL}/level?level=${levelID}`;
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

const getAll = async () => {
  const postUserURL = `${config.apiURL}/levels`;
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

const getAllLevelState = async () => {
  const postUserURL = `${config.apiURL}/level/states`;
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

const getLevelState = async (levelID) => {
  const postUserURL = `${config.apiURL}/level/state/${levelID}`;
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
  getLevel,
  getAll,
  getAllLevelState,
  getLevelState,
};
