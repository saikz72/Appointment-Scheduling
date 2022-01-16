import { useAuth } from '../utility/AuthProvider';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import TechnicianDashboard from './TechnicianDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const content =
    user.userType === 'Customer' ? (
      <CustomerDashboard />
    ) : user.userType === 'Technician' ? (
      <TechnicianDashboard />
    ) : (
      <AdminDashboard />
    );
  return content;
};

export default Dashboard;
