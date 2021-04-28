// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { initTranslations } from './utils/i18n/translations.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import store from './store.js'

import App from './App.jsx'
import NotFound from './features/not-found/NotFound.jsx'
import Header from './features/header/Header.jsx';
import Login from './features/login/Login.jsx'

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

document.documentElement.lang = 'ru';

const init = async () => initTranslations().then((i18nFunction) => {
  const renderApp = () => (
    <Route exact path="/">
      <App i18nFunction={i18nFunction} />
    </Route>
  );

  render(
    <Provider store={store}>
      <Router>
        <div className={"h-100"}>
          <Header i18nFunction={i18nFunction}/>
          <Switch>
            {renderApp()}
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
