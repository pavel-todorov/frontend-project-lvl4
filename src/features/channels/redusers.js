import { handleActions } from 'redux-actions';

import { channelsRequest } from './actions.js';

const defaultState = [];

const channelsRequestHandler = (state, data) => {
  return state;
};

const handlers = {
  [channelsRequest]: channelsRequestHandler,
};

export default handleActions(handlers, defaultState);
