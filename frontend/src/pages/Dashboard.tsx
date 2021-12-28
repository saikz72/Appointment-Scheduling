import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utility/AuthProvider';

const Dashboard = () => {
  let navigate = useNavigate();

  const auth = useAuth();
  const logout = () => {
    auth.signout(() => navigate('/'));
  };
  return (
    <div>
      <Typography>Dashbaord</Typography>
      <Button onClick={logout} color="primary">
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;