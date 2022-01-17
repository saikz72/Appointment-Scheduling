import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthProvider from './utility/AuthProvider';
import RequireAuth from './components/RequireAuth';
import SignupPage from './pages/SignupPage';
import DataProvider from './utility/DataProvider';
import BookAppointmentPage from './pages/BookAppointmentPage';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { getUserInformation } from './services/AuthService';

/*Common Theme configuration for both dark and light mode */
const commonTheme: any = {
  typography: {
    fontSize: 11.5,
  },
};

/*Light Theme configuration */
const lightTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    primary: {
      main: '#001E3C',
      light: '#ffff',
    },
    secondary: {
      main: '#001E3C',
    },
    background: {
      paper: '#FFFF',
      default: '#001E3C',
    },
    text: {
      primary: '#000',
    },
  },
});
function App() {
  // fet from local storage
  useEffect(() => {
    getUserInformation({ userId: '61ca3883268903c90ea30035', userType: 'Customer' });
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/appointment"
                element={
                  <RequireAuth>
                    <BookAppointmentPage />
                  </RequireAuth>
                }
              />
              <Route path="/ForgotPassword" />
              <Route path="/Signup" element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
