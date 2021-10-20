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

const updateUser = async (user) => {
  const postUserURL = `${config.apiURL}/user`;
  try {
    const result = await axios.put(postUserURL, user,
      {
        headers: await authHeaderProvider.getAuthHeaders(),
      });
    return result.data;
  } catch (error) {
    return error;
  }
};

const getAllUsers = async (index, pageSize) => {
  const postUserURL = `${config.apiURL}/users?page_index=${index}&page_size=${pageSize}`;
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

const reset = async (id) => {
  const postUserURL = `${config.apiURL}/users?id=${id}`;
  try {
    const result = await axios.delete(postUserURL,
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
  getAllUsers,
  updateUser,
  reset,
};
