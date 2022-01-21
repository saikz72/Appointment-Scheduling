import { api } from '../utility/AuthProvider';
import { baseURL } from '../utility/constants';

export const getUserInformation = async (requestBody: any) => {
  try {
    const response = await api.post(baseURL + '/auth/user', requestBody);
    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
