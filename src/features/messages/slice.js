/* eslint no-param-reassign: ["off"] */
import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    isSending: false,
  },
  reducers: {
    messageSending: (state) => {
      console.log(`MessagesSlice::messageSending: ${JSON.stringify(state)}`);
      state.isSending = true;
    },
    messageSent: (state) => {
      console.log(`MessagesSlice::messageSent: ${JSON.stringify(state)}`);
      state.isSending = false;
    },

  },
});

export const { messageSending, messageSent } = messagesSlice.actions;

export default messagesSlice.reducer;
