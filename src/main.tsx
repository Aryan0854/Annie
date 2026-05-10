import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MyListProvider } from './context/MyListContext';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyListProvider>
      <App />
    </MyListProvider>
  </React.StrictMode>
);
