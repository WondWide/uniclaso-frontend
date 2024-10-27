import axios from 'axios';

const getManagementApiToken = async () => {
  try {
    const response = await axios.post(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting management token:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const token = await getManagementApiToken();
    const response = await axios.get(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const token = await getManagementApiToken();
    const response = await axios.patch(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};