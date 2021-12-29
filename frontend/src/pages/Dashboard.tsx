import { useAuth } from '../utility/AuthProvider';
import CustomerDashboard from './CustomerDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const content = user.userType === 'Customer' ? <CustomerDashboard /> : user.userType === 'Technician' ? <></> : <></>;
  return content;
};

export default Dashboard;
