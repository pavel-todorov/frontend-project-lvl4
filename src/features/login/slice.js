/* eslint no-param-reassign: ["off"] */
import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    modalMessage: '',
    showModal: false,
  },
  reducers: {
    setModalState: (state, action) => {
      state.modalMessage = action.payload.message;
      state.showModal = action.payload.showModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalState } = loginSlice.actions;

export default loginSlice.reducer;
