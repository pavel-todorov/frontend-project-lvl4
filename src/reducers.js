import { combineReducers } from 'redux';
import channelsReducers from './features/channels/redusers.js';
import { setLoggedState } from './actions.js'
import { handleActions } from 'redux-actions';

const defaultState = {
  isLoggedIn: false,
};

const setLoggedStateHandler = (state, data) => {
  return state;
};

const handlers = {
  [setLoggedState]: setLoggedStateHandler,
};

const appActions = handleActions(handlers, defaultState)

export default combineReducers({
  app: appActions,
  channels: channelsReducers,
});