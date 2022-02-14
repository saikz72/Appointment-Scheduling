import { api } from '../utility/AuthProvider';
import { baseURL } from '../utility/constants';

export const addAutomobileToServer = async (requestBody: any) => {
  try {
    const response = await fetch(baseURL + `/automobile/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAutomobilesFromServer = async (customerId: string) => {
  try {
    const response = await fetch(baseURL + `/automobile/${customerId}`);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAutomobileInServer = async (automobileID: string, requestBody: any) => {
  try {
    const response = await api.put(baseURL + `/automobile/update/${automobileID}`, requestBody);
    if (response.status !== 200) {
      throw new Error('Something went wrong');
    }
    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAutomobileFromServer = async (automobileID: string) => {
  try {
    const response = await api.delete(baseURL + `/automobile/delete/${automobileID}`);
    console.log(response.data);
    if (response.status !== 200) {
      throw new Error('Something went wrong');
    }
    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
