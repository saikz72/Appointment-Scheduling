import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

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
