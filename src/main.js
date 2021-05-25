import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import Rollbar from 'rollbar';
import { Provider } from 'react-redux';

import { initTranslations } from './utils/i18n/translations.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import store from './store.js'

import App from './App.jsx'
import NotFound from './features/not-found/NotFound.jsx';
import Header from './features/header/Header.jsx';
import Login from './features/login/Login.jsx';
import Signup from './features/signup/Signup.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

document.documentElement.lang = 'ru';

// var rollbar = new Rollbar({
//   accessToken: "5f7f509a3a4c46a5a39abde24982cd81",
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// });

const init = async (socket) => initTranslations().then((i18nFunction) => {
  console.log('Application initialization started...');
  // rollbar.info('Application initialization started...');

  const renderApp = () => (
    <Route exact path="/">
      <App i18nFunction={i18nFunction} socket={socket} />
    </Route>
  );

  return (
   <Provider store={store}>
      <Router>
        <div className={"h-100"}>
          <Header i18nFunction={i18nFunction} />
          <Switch>
            {renderApp()}
            <Route path="/login">
              <Login i18nFunction={i18nFunction} />
            </Route>
            <Route path="/signup">
              <Signup i18nFunction={i18nFunction} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
  // rollbar.info('Application initialization finished.');
}).catch((err) => {
  return (`Error while initializing page: ${err}`);
  // rollbar.critical(`Application initialization failed: ${err}`);
});

export default init;