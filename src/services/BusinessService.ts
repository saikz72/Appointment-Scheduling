import BusinessType from '../types/BusinessType';
import { baseURL } from '../utility/constants';

export const getBusinessInfo = async () => {
  try {
    const response = await fetch(baseURL + '/business');
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBusinessInfo = async (business: BusinessType, businessId?: string) => {
  try {
    const response = await fetch(baseURL + `/business/${businessId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(business),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
