import Rollbar from "rollbar";
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
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    newMessage: (state, action) => {
      console.log(`AppSlice::newMessage: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`);
      const message = { ...action.payload, channelId: state.currentChannelId };
      if (state.messages.find((item) => (item.id === message.id))) {
        state.messages = [...state.messages.filter((item) => (item.id !== message.id)), message];
        return;
      }
      state.messages = [...state.messages, message]
    },
    newChannel: (state, action) => {
      console.log(`AppSlice::newChannel: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`);
      const channel = action.payload;
      state.channels = [...state.channels, channel];
    },
    renameChannel: (state, action) => {
      console.log(`AppSlice::renameChannel: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`)
      const channel = action.payload;
      state.channels = state.channels.filter((item) => (item.id !== channel.id));
      state.channels = [...state.channels, channel];
    },
    removeChannel: (state, action) => {
      console.log(`AppSlice::removeChannel: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`)
      const channel = action.payload;
      state.channels = state.channels.filter((item) => (item.id !== channel.id));
      state.currentChannelId = state.channels[0].id;
      state.messages = state.messages.filter((item) => (item.channelId != channel.id));
    },
  },
});

export const { 
  setLoggedState,
  channelsLoading,
  channelsReceived,
  newMessage,
  setCurrentChannel,
  newChannel,
  renameChannel,
  removeChannel } = appSlice.actions

export default appSlice.reducer