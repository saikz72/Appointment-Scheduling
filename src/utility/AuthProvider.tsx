import React from 'react';
import axios from 'axios';
import { baseURL } from './constants';

export const api = axios.create({
  baseURL: baseURL,
});

interface AuthContextType {
  user: any;
  signin: (user: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  signup: (user: any, callback: VoidFunction) => void;
  setUser: (user: any) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);
  let signin = async (newUser: any, callback: VoidFunction) => {
    // Login API call here
    try {
      const response = await api.post('/auth/login', newUser);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  let signout = async (callback: VoidFunction) => {
    //Logout API call here

    try {
      await api.post('/auth/logout');
      setUser(null);
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  let signup = async (newUser: any, callback: VoidFunction) => {
    // Sign up API call here
    try {
      const response = await api.post('/auth/register', newUser);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  let value = { user, signin, signout, signup, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthProvider;
