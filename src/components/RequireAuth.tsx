import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { usePersist } from '../utility/PersistenceProvider';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user } = usePersist();

  if (!user) {
    console.log('here');
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
