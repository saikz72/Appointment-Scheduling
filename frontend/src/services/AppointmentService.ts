import { baseURL } from '../utility/constants';

export const bookAppointment = async (requestBody: any) => {
  const response = await fetch(baseURL + '/appointment/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    const message: string = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

export const getAllAppointmentsOfCustomer = async (customerId: string) => {
  const response = await fetch(baseURL + `/appointment/getAllAppointmentsOfCustomer/${customerId}`);
  if (!response.ok) {
    const message: string = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

export const getAllAppointmentsOfTechnician = async (technicianId: string) => {
  const response = await fetch(baseURL + `/appointment/getAllAppointmentsOfTechnician/${technicianId}`);
  if (!response.ok) {
    const message: string = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};
