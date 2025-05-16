import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setSuccess } from "../redux/Slices/notificationSlice";

const createThunk = (type, apiCall, skipSuccess = false) => {
    return createAsyncThunk(
        type,
        async (payload, { dispatch, rejectWithValue, getState }) => {
            try {
                const state = getState();
                const accessToken = state.auth?.accessToken; // 🔥 access token from Redux

                const headers = accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {};

                // inject headers into apiCall
                const response = await apiCall(payload, headers);

                if (!skipSuccess) {
                    dispatch(setSuccess(response.data.message));
                }

                return response.data.data;
            } catch (error) {
                console.error(`${type} Error:`, error);
                const errorMessage = error.response?.data?.message || "Operation Failed";
                dispatch(setError(errorMessage));
                return rejectWithValue(errorMessage);
            }
        }
    );
};

export default createThunk;
