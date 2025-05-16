import { createSlice } from '@reduxjs/toolkit';

const confirmationModalSlice = createSlice({
  name: 'confirmModal',
  initialState: {
    isOpen: false,
    title:null,
    message: null,
    action: null,
    payload:null,
  },
  reducers: {
    showConfirmModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title ||  "Are you sure ?"
      state.message = action.payload.message;
      state.action = action.payload.action;
      state.payload = action.payload.payload;
    },
    hideConfirmModal: (state) => {
        state.isOpen = false;
        state.title = null
        state.message = null
        state.action = null
        state.payload = null
    },
  },
});

export const { showConfirmModal, hideConfirmModal } = confirmationModalSlice.actions;
export default confirmationModalSlice.reducer;
