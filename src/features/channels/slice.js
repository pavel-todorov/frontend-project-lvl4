/* eslint no-param-reassign: ["off"] */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    askNameModal: {
      isShown: false,
      question: '',
      tag: '',
    },
    confirmModal: {
      isShown: false,
      question: '',
      tag: '',
    },
  },
  reducers: {
    showAskNameModal: (state, action) => {
      console.log(`ChannelsSlice::showAskNameModal(${JSON.stringify(state)}, ${JSON.stringify(action.payload)}): ENTER`);
      const { question, isShown, tag } = action.payload;
      state.askNameModal.question = question;
      state.askNameModal.isShown = isShown;
      state.askNameModal.tag = tag;
    },
    showConfirmModal: (state, action) => {
      console.log(`ChannelsSlice::showConfirmModal(${JSON.stringify(state)}, ${JSON.stringify(action.payload)}): ENTER`);
      const { question, isShown, tag } = action.payload;
      state.confirmModal.question = question;
      state.confirmModal.isShown = isShown;
      state.confirmModal.tag = tag;
    },
  },
});

export const { showAskNameModal, showConfirmModal } = channelsSlice.actions;

export default channelsSlice.reducer;
