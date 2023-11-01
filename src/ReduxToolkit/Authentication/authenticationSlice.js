// store/authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthLoading: false,
    isAuthError: false,
    token: null,
    coinBalance: 0,
};

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        // Login 
        loginRequest(state) {
            state.isAuthLoading = true;
            state.isAuthError = false;
        },
        loginSuccess(state, action) {
            localStorage.setItem("bet_token", action?.payload?.token || action?.payload?.agent?.token);
            state.coinBalance = action?.payload?.coinBalance || 0;
            state.isAuthLoading = false;
            state.isAuthError = false;
            state.token = action?.payload?.token;
        },
        loginFailure(state, action) {
            console.log("login failure in reducer", action);
            state.isAuthLoading = false;
            state.isAuthError = true;
            state.token = null;
        },

        logoutSuccess(state, action) {
            localStorage.removeItem("bat_token");
            state.token = null;
        },
    },
});


export const {

    loginRequest,
    loginSuccess,
    loginFailure,

    logoutSuccess,

} = authenticationSlice.actions;


export default authenticationSlice.reducer;
