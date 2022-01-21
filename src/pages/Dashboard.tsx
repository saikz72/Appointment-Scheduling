import { usePersist } from '../utility/PersistenceProvider';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import TechnicianDashboard from './TechnicianDashboard';

const Dashboard = () => {
  const { user } = usePersist();

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
