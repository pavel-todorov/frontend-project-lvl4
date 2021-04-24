import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    loading: 'idle',
    channels: [],
  },
  reducers: {
    channelsLoading: (state) => {
      console.log(`ChannelSlice::channelsLoading: ${JSON.stringify(state)}`);
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    channelsReceived: (state, action) => {
      console.log(`ChannelSlice::channelsReceived: ${JSON.stringify(state)} -> ${JSON.stringify(action)}`);
      if (state.loading === 'pending') {
        state.loading = 'done'
        state.channels = action.payload.channels;
      }
    },
  }
});

export const { channelsLoading, channelsReceived } = channelsSlice.actions

export default channelsSlice.reducer
