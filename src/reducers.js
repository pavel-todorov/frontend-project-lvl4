import { combineReducers } from 'redux';
import channelsReducers from './features/channels/redusers.js';

export default combineReducers({
  channels: channelsReducers,
});