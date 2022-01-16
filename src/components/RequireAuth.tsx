import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utility/AuthProvider';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const auth = useAuth();
  const isAuthenticated: string | null = localStorage.getItem('isAuthenticated');

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
