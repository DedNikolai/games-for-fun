import React from 'react';
import './index.scss';
import App from './App';
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme/theme';
import ToastrMessage from './components/ToastrMessage/ToastrMessage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <App />
                  <ToastrMessage/>
              </ThemeProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
