import { useAuth } from '../utility/AuthProvider';
import { usePersist } from '../utility/PersistenceProvider';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import TechnicianDashboard from './TechnicianDashboard';

const Dashboard = () => {
  const persist = usePersist();
  const auth = useAuth();
  const user = auth.user ? auth.user : persist.user;

  console.log('da', user, persist.user, auth.user);
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
