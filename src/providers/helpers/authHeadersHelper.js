import { getAuth } from 'firebase/auth';

const getAuthHeaders = async () => {
  const auth = getAuth();
  const { currentUser } = auth;

  let authToken = '';

  if (currentUser) {
    authToken = await currentUser.getIdToken();
  }

  return {
    Authorization: `token ${authToken}`,
  };
};

export default { getAuthHeaders };
