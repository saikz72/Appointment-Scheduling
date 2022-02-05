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

export const createTechnician = async (requestBody: any) => {
  try {
    const response = await fetch(baseURL + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const message: string = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllTechnicians = async () => {
  try {
    const response = await fetch(baseURL + '/auth/getAllTechnicians');
    if (!response.ok) {
      const message: string = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTechnician = async (requestBody: any) => {
  console.log(requestBody);
  try {
    const response = await fetch(baseURL + '/auth/deleteAccount', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const message: string = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    return await response.json();
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};
