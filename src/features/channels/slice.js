import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
  },
});

export const { channelsLoading, channelsReceived, newMessage } = channelsSlice.actions

export default channelsSlice.reducer
