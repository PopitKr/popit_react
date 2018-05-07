import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

// import createStore from 'store/create';
// const store = createStore(window.__INITIAL_STATE__);

hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('app')
);