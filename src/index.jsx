import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app.jsx';
import '@ya.praktikum/react-developer-burger-ui-components';
import { Provider } from 'react-redux';
import { store } from './services/index'


const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
