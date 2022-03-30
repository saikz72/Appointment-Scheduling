import { api } from '../utility/AuthProvider';
import { baseURL } from '../utility/constants';

export const getAllProductsFromServer = async () => {
  try {
    const response = await api.get(baseURL + '/product');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (requestBody: any) => {
  try {
    const response = await fetch(baseURL + `/product`, {
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

export const deleteProduct = async (productId?: string) => {
  try {
    const response = await fetch(baseURL + `/product/${productId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId?: string, updates?: any) => {
  try {
    const response = await fetch(baseURL + `/product/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
