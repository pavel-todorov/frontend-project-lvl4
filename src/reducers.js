import { combineReducers } from 'redux';
import channelsReducer from './features/channels/redusers';

export default combineReducers({
  channels: channelsReducer,
});