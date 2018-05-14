import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'
import MobileDetect from "mobile-detect/mobile-detect";
import ScrollToTop from '../components/util/ScrollToTop';

// import createStore from 'store/create';
// const store = createStore(window.__INITIAL_STATE__);

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile() ? true : false;

hydrate(
    <Router>
      <ScrollToTop>
        <App isMobile={isMobile}/>
      </ScrollToTop>
    </Router>,
  document.getElementById('app')
);