// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from "./Authentication/authenticationSlice";
import userReducer from "./UserManagement/usersSlice";

const store = configureStore({
    reducer: {
        userReducer,
        authenticationReducer,
    },
});

export default store;
