import axios from "axios";
import { logout, setAccessToken } from "../redux/Slices/authSlice";
import { navigateTo } from "../utils/NavigationService";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default API;

// Setup Axios interceptors
export const setupInterceptors = (store) => {
    // Attach token in requests
    API.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Handle 401s and refresh logic
    API.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const status = error.response?.status;
            const errorMessage = error.response?.data?.message || "Unknown error";

            if (status === 401) {
                switch (errorMessage) {
                    case "Session not found or already invalidated.":
                    case "Session is invalid or expired.":
                    case "User no longer exists.":
                    case "Unauthorized. Authentication failed.":
                    case "Unauthorized. Invalid token.":
                    case "Unauthorized. No access token provided.":
                        await store.dispatch(logout());
                        localStorage.removeItem("user");
                        navigateTo('/login')
                        return Promise.reject(error);

                    case "Unauthorized. Token has expired.":
                        if (!originalRequest._retry) {
                            originalRequest._retry = true;
                            try {
                                const refreshRes = await axios.post(
                                    `${API_URL}/auth/refresh`,
                                    {},
                                    { withCredentials: true }
                                );
                                const newAccessToken = refreshRes.data.data;
                                store.dispatch(setAccessToken(newAccessToken));
                                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                                return API(originalRequest);
                            } catch (refreshError) {
                                await store.dispatch(logout());
                                localStorage.removeItem("user");
                                navigateTo('/login')
                                return Promise.reject(refreshError);
                            }
                        }
                        break;

                    default:
                        return Promise.reject(error);
                }
            }

            return Promise.reject(error); // For other errors
        }
    );
};
