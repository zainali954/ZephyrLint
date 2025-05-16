import { createSlice } from "@reduxjs/toolkit";
import createThunk from "../../utils/createThunk";
import handleAsyncCases from "../../utils/handleAsync";
import API from "../../services/api";

// Async Thunks
export const fetchReviews = createThunk("review/fetchReviews", () => API.get("/ai"), true);
export const fetchReviewById = createThunk("review/fetchReviewById", (id) => API.get(`/ai/review/${id}`), true);
export const deleteReviewById = createThunk("review/deleteReviewById", (id) => API.delete(`/ai/review/${id}`));
export const updateReviewTitle = createThunk("review/updateReviewTitle", ({id, title}) => API.patch(`/ai/review/${id}`, {title}), true);

//  Initial State
const initialState = {
  isLoading: false,
  code: "",
  result: "",
  language: 'javascript',
  title: "",
  mode:"general",
  reviews: (() => {
    try {
      const stored = localStorage.getItem('reviews');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to parse reviews from localStorage:', err);
      return [];
    }
  })()
};


//  review Slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    pushNewReview: (state, action) => {
      state.reviews = [...(state.reviews || []), action.payload];
    },
    setCode(state, action) { state.code = action.payload; },
    setResult(state, action) { state.result = action.payload; },
    setTitle(state, action) { state.title = action.payload; },
    setMode(state, action) { state.mode = action.payload; },
    setLanguage(state, action) { state.language = action.payload; },
    setTitleUpdate: (state, action) => {
      const index = state.reviews.findIndex((i) => i._id === action.payload.id);
      if (index !== -1) {
        state.reviews[index].title = action.payload.title;
      }
    }

  },
  extraReducers: (builder) => {
    handleAsyncCases(builder, fetchReviews, (state, action) => {
      state.reviews = action.payload
      localStorage.setItem("reviews", JSON.stringify(state.reviews))
    });
    handleAsyncCases(builder, deleteReviewById, (state, action) => {
      state.reviews = state.reviews.filter((r) => r._id !== action.meta.arg)
      localStorage.setItem("reviews", JSON.stringify(state.reviews))

    })

    handleAsyncCases(builder, fetchReviewById, (state, action) => {
      state.code = action.payload.code;
      state.result = action.payload.review;
      state.language = action.payload.language;
      state.title = action.payload.title;
      state.mode =action.payload.mode || "general"
    })

    handleAsyncCases(builder, updateReviewTitle, (state, action) => {
      const index = state.reviews.findIndex((i) => i._id === action.meta.arg.id);
      if (index !== -1) {
        state.reviews[index].title = action.payload.title;
      }

    })
  },
});

// Exports
export const { pushNewReview, setCode, setTitle, setLanguage, setResult, setTitleUpdate, setMode } = reviewSlice.actions
export default reviewSlice.reducer;
