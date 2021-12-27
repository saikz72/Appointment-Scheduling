import Admin from '../models/Admin';
import Customer from '../models/Customer';
import Technician from '../models/Technician';

const getUserType = (userType: string) => {
  if (userType === 'Admin') {
    return Admin;
  } else if (userType === 'Technician') {
    return Technician;
  } else {
    //'Customer'
    return Customer;
  }
};

export default getUserType;
