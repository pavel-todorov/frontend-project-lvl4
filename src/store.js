import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slice.js';
import channelsReducer from './features/channels/slice.js';
import loginReducer from './features/login/slice.js';
import messagesReducer from './features/messages/slice.js';
import signupReducer from './features/signup/slice.js';

export default configureStore({
  reducer: {
    app: appReducer,
    channels: channelsReducer,
    login: loginReducer,
    messages: messagesReducer,
    signup: signupReducer,
  },
});
