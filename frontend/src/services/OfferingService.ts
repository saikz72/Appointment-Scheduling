import ServiceType from '../types/ServiceType';
import { api } from '../utility/AuthProvider';
import { baseURL } from '../utility/constants';

export const getAllServices = async () => {
  try {
    const response = await api.get(baseURL + '/service');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteServiceFromServer = async (serviceId?: string) => {
  try {
    const response = await fetch(baseURL + `/service/delete/${serviceId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateServiceFromServer = async (
  service?: ServiceType,
  serviceId?: string
) => {
  try {
    const response = await fetch(baseURL + `/service/update/${serviceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addServiceToServer = async (requestBody: any) => {
  try {
    const response = await fetch(baseURL + `/service/create/`, {
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
