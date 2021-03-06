import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { App } from './components/App';

import './styles/index.scss';
import { UserProvider } from './contexts/userContext';
import { PopupProvider } from './contexts/popupContext';
import { SocketProvider } from './contexts/socketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <PopupProvider>
        <SocketProvider>
          <Router>
            <App />
          </Router>
        </SocketProvider>
      </PopupProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
