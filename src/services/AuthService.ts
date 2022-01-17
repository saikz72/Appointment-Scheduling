import { baseURL } from '../utility/constants';

export const getUserInformation = async (requestBody: any) => {
  try {
    const response = await fetch(baseURL + '/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
