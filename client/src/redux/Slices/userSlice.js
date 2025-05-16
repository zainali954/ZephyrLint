import { createSlice } from "@reduxjs/toolkit";
import createThunk from "../../utils/createThunk";
import handleAsyncCases from "../../utils/handleAsync";
import API from "../../services/api";

// Async Thunks
export const updateName = createThunk("user/updateName", (name) => API.patch("/user/update-name", {name}));
export const updatePassword = createThunk("user/updatePassword", (data) => API.patch("/user/update-password", data));

//  Initial State
const initialState = {
  isLoading: false,
  reviews:[]
};

//  User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   pushNewReview: (state, action) => {
  state.reviews = [...(state.reviews || []), action.payload];
  localStorage.setItem("reviews", JSON.stringify(state.reviews))
}

  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, updateName, (state, action) => {});
    handleAsyncCases(builder, updatePassword, (state, action) => {});
  },
});

// Exports
export const {pushNewReview} = userSlice.actions
export default userSlice.reducer;
