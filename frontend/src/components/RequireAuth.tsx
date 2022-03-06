import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { usePersist } from "../utility/PersistenceProvider";
import { useAuth } from "../utility/AuthProvider";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user } = usePersist();
  const auth = useAuth();

  if (!user && !auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
