// Imports
import { createSlice } from "@reduxjs/toolkit";
import createThunk from "../../utils/createThunk";
import handleAsyncCases from "../../utils/handleAsync";
import API from "../../services/api";

// Local Storage
const user = JSON.parse(localStorage.getItem("user"));
const sessionId = localStorage.getItem("sessionId") || null;

// Async Thunks
// Auth Core
export const login = createThunk("auth/login", (data) => API.post("/auth/login", data));
export const googleLogin = createThunk("auth/googleLogin", (data) => API.post("/auth/google", data));
export const signup = createThunk("auth/signup", (data) => API.post("/auth/signup", data));
export const verify = createThunk("auth/verify", (data) => API.post("/auth/verify", data));
export const resendVerificationEmail = createThunk("auth/resendVerificationEmail", (data) =>
  API.post("/auth/resend-verification-email", data)
);
export const logout = createThunk("auth/logout", () => API.post("/auth/logout"));

// Token Handling
export const refreshAccessToken = createThunk("auth/refreshToken", () => API.post("/auth/refresh"), true);

// Password Reset
export const forgotPassword = createThunk("auth/forgot-password", (data) =>
  API.post("/auth/forgot-password", data)
);
export const resetPassword = createThunk("auth/reset-password", (data) =>
  API.post("/auth/reset-password", data)
);

// Sessions
export const getSessions = createThunk("auth/sessions", (payload, headers) =>
  API.get("/auth/sessions", { headers }), true
);
export const deleteAllSessions = createThunk("auth/deleteAllSessions", () =>
  API.delete("/auth/sessions")
);
export const logoutOtherSessions = createThunk("auth/logoutOtherSessions", (id) =>
  API.post("/auth/logout-others", { currentSessionId: id })
);

export const setApiKey = createThunk("auth/setApiKey", (key) =>API.post("/user/add-api-key", {key}))
export const removeApiKey = createThunk("auth/removeApiKey", () =>API.delete("/user/remove-api-key"))

//  Initial State
const initialState = {
  user: user ? user : null,
  accessToken: "",
  isLoading: false,
  sessionId,
  sessions: [],
};

//  Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setName: (state, action) => {
        if (state.user) {
          state.user.name = action.payload;
        }
      }
      
  },
  extraReducers: (builder) => {
    // Login
    handleAsyncCases(builder, login, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.sessionId = action.payload.sessionId;
      localStorage.setItem("sessionId", state.sessionId);
      localStorage.setItem("user", JSON.stringify(state.user));
    });

    // Google Login
    handleAsyncCases(builder, googleLogin, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.sessionId = action.payload.sessionId;
      localStorage.setItem("sessionId", state.sessionId);
      localStorage.setItem("user", JSON.stringify(state.user));
    });

    // Signup / Verify / Resend
    handleAsyncCases(builder, signup, () => {});
    handleAsyncCases(builder, verify, () => {});
    handleAsyncCases(builder, resendVerificationEmail, () => {});

    // Logout
    handleAsyncCases(builder, logout, (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.accessToken = null;
    });

    // Refresh Token
    handleAsyncCases(builder, refreshAccessToken, (state, action) => {
      state.accessToken = action.payload;
    });

    // Forgot / Reset Password
    handleAsyncCases(builder, forgotPassword, () => {});
    handleAsyncCases(builder, resetPassword, () => {});

    // Get Sessions
    handleAsyncCases(builder, getSessions, (state, action) => {
      state.sessions = action.payload;
    });

    // Delete All Sessions
    handleAsyncCases(builder, deleteAllSessions, (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.accessToken = null;
      state.sessions = [];
    });

    // Logout Other Sessions
    handleAsyncCases(builder, logoutOtherSessions, (state, action) => {
      state.sessions = state.sessions.map((s) => {
        if (s._id !== action.meta.arg) {
          s.isValid = false;
        }
        return s;
      });
    });

    // Add apikey
    handleAsyncCases(builder, setApiKey, (state) => {
      state.user.hasKey = true
      localStorage.setItem("user", JSON.stringify(state.user));
    });

    // remove apikey
    handleAsyncCases(builder, removeApiKey, (state) => {
      state.user.hasKey = false
      localStorage.setItem("user", JSON.stringify(state.user));
    });
  },
});

// Exports
export const { setAccessToken, setName } = authSlice.actions;
export default authSlice.reducer;
