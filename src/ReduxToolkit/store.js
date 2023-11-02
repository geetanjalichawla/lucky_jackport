// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from "./Authentication/authenticationSlice";
import userReducer from "./UserManagement/usersSlice";
import coinTransfer from "./coinManagerment/coinTransferReducer";

const store = configureStore({
    reducer: {
        userReducer,
        authenticationReducer,
        coinTransfer
    },
});

export default store;
