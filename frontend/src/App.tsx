import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import AuthProvider from './utility/AuthProvider';
import RequireAuth from './components/RequireAuth';
import SignupPage from './pages/SignupPage';

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
    mode: 'light',
    primary: {
      main: '#000',
    },
    secondary: {
      main: blue[500],
    },
    background: {
      paper: 'white',
      default: '#EEEEEE',
    },
    text: {
      primary: '#000',
    },
  },
});

/*Dark Theme configuration */
const darkTheme: Theme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      paper: '#001E3C',
      default: '#0A1929',
    },
    text: {
      primary: '#fff',
    },
  },
});

function App() {
  const [theme, setTheme] = useState<string>('dark');
  const globalTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={globalTheme}>
      <AuthProvider>
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
            <Route path="/ForgotPassword" />
            <Route path="/Signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
