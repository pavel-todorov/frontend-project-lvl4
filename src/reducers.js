import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import channelsReducers from './features/channels/redusers.js';
import loginReducers from './features/login/reducers.js'

import { setLoggedState } from './actions.js'

const defaultState = {
  isLoggedIn: false,
};

const setLoggedStateHandler = (state, { payload: { isLoggedIn }}) => {
  console.log(`App::reducers::setLoggedStateHandler(state = ${JSON.stringify(state)}, isLoggedIn = ${isLoggedIn})`);
  return { isLoggedIn };
};

const handlers = {
  [setLoggedState]: setLoggedStateHandler,
};

const appActions = handleActions(handlers, defaultState)

export default combineReducers({
  app: appActions,
  login: loginReducers,
  channels: channelsReducers,
});