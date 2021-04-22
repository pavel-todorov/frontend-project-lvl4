import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoggedState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { setLoggedState } = appSlice.actions

export default appSlice.reducer