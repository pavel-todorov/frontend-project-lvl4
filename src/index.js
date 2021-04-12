// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './App'

import gon from 'gon';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = createStore(reducers);

render(
  <Provider store={store}>
    <App data={gon}/>
  </Provider>,
  document.querySelector('#chat'),
);

console.log('it works!');
console.log('gon', gon);
