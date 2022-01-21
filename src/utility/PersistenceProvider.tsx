import React from 'react';
interface PersistenceContextType {
  user: any;
}

const PersistenceContext = React.createContext<PersistenceContextType>(null!);

export const PersistenceProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem('user');
  let user: any;
  if (storedUser !== null) user = JSON.parse(storedUser);
  let value = { user };
  return <PersistenceContext.Provider value={value}>{children}</PersistenceContext.Provider>;
};

export const usePersist = () => {
  return React.useContext(PersistenceContext);
};
