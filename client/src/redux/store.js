import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slices/authSlice"
import userReducer from "../redux/Slices/userSlice"
import notificationReducer from '../redux/Slices/notificationSlice'
import { setupInterceptors } from "../services/api";
import confirmModalReducer from '../redux/Slices/confirmModalSlice'
import reviewReducer from '../redux/Slices/reviewSlice'

const store = configureStore({
    reducer:{
        auth : authReducer,
        user : userReducer,
        review : reviewReducer,
        notification : notificationReducer,
        confirmModal : confirmModalReducer
    }
})
setupInterceptors(store);
export default store;