import { baseURL } from '../utility/constants';

export const addAutomobileToServer = async (requestBody: any) => {
  try {
    const response = await fetch(baseURL + `/automobile/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
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
