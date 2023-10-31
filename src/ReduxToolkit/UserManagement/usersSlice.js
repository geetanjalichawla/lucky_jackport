// store/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userProfile: [],
    isUserProfileLoading: false,
    isUserProfileError: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUserProfileRequest(state) {
            state.isUserProfileLoading = true;
            state.isUserProfileError = false;
        },
        getUserProfileSuccess(state, action) {
            state.userProfile = action.payload ? action.payload : {};
            state.isUserProfileLoading = false;
            state.isUserProfileError = false;
        },
        getUserProfileFailure(state, action) {
            state.userProfile = {};
            state.isUserProfileLoading = false;
            state.isUserProfileError = true;
        },
    },
});


export const {

    getUserProfileRequest,
    getUserProfileSuccess,
    getUserProfileFailure,

} = usersSlice.actions;

export default usersSlice.reducer;
