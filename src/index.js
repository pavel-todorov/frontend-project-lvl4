// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import { initTranslations } from './utils/i18n/translations';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import gon from 'gon';

import App from './App'
import NotFound from './features/not-found/NotFound'
import Header from './features/header/Header';
import Login from './features/login/Login'

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

document.documentElement.lang = 'ru';

const store = createStore(reducers);

const init = async () => initTranslations().then((i18nFunction) => {
  render(
    <Provider store={store}>
      <Router>
        <div>
          <Header i18nFunction={i18nFunction}/>
          <Switch>
            <Route exact path="/">
              <App data={gon} i18nFunction={i18nFunction} />
            </Route>
            <Route path="/login">
              <Login i18nFunction={i18nFunction} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.querySelector('#chat'),
  );
}).catch((err) => {
  document.body.textContent = `Error while initializing page: ${err}`;
});

init().then(() => {});
