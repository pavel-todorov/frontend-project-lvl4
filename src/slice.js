import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoggedIn: false,
    channelsLoadingState: 'idle',
    channels: [],
    messages: [],
  },
  reducers: {
    setLoggedState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    channelsLoading: (state) => {
      console.log(`AppSlice::channelsLoading: ${JSON.stringify(state)}`);
      if (state.channelsLoadingState === 'idle') {
        state.channelsLoadingState = 'pending';
      }
    },
    channelsReceived: (state, action) => {
      console.log(`AppSlice::channelsReceived: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`);
      if (state.channelsLoadingState === 'pending') {
        state.channelsLoadingState = 'done'
        state.channels = action.payload.channels;
        state.messages = action.payload.messages;
        state.currentChannelId = action.payload.currentChannelId;
      }
    },
    newMessage: (state, action) => {
      console.log(`AppSlice::newMessage: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`);
      const message = { ...action.payload, channelId: state.currentChannelId };
      if (state.messages.find((item) => (item.id === message.id))) {
        return;
      }
      state.messages = [...state.messages, message]
    },
  },
});

export const { setLoggedState, channelsLoading, channelsReceived, newMessage } = appSlice.actions

export default appSlice.reducer