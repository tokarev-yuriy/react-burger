import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app';
import '@ya.praktikum/react-developer-burger-ui-components';
import { Provider } from 'react-redux';
import { store } from './services/index'
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as Element
);
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
  
);
