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

function App() {
  return (
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
            <Route path="/ForgotPassword" />
            <Route path="/Signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
