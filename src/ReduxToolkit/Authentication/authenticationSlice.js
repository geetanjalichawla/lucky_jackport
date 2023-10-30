// store/authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthLoading: false,
    isAuthError: false,
    token: null,
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
            localStorage.setItem("live_token", action?.payload?.token);
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
    },
});


export const {

    loginRequest,
    loginSuccess,
    loginFailure,

} = authenticationSlice.actions;


export default authenticationSlice.reducer;
