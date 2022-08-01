import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import FirebaseContextProvider from './context/FirebaseContext';
import './assets/global.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter>
  <FirebaseContextProvider>
  <App />
  </FirebaseContextProvider>
</HashRouter>
);

