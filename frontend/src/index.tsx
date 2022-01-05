import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';

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
    mode: 'dark',
    primary: {
      main: '#fff',
      dark: '#001E3C',
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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
