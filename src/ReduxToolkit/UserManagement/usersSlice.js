// store/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allUsers: [],
    isUsersLoading: false,
    isUsersError: false,

    userById: [],
    isUserByIdLoading: false,
    isUserByIdError: false,

    userFollowers: [],
    isUsersFollowersLoading: false,
    isUsersFollowersError: false,

    userFollowings: [],
    isUsersFollowingsLoading: false,
    isUsersFollowingsError: false,

    userFriends: [],
    isUsersFriendsLoading: false,
    isUsersFriendsError: false,

    userViewers: [],
    isUsersViewersLoading: false,
    isUsersViewersError: false,
    totalViewerPages: 1,

    userRewards: [],
    isUserRewardsLoading: false,
    isUserRewardsError: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Get All Users:-
        getUserRequest(state) {
            state.isUsersLoading = true;
            state.isUsersError = false;
        },
        getUserSuccess(state, action) {
            state.allUsers = action.payload ? action.payload : [];
            state.isUsersLoading = false;
            state.isUsersError = false;
        },
        getUserFailure(state, action) {
            state.allUsers = [];
            state.isUsersLoading = false;
            state.isUsersError = true;
        },


        // user by id:-
        getUserByIdRequest(state) {
            state.isUserByIdLoading = true;
            state.isUserByIdError = false;
        },
        getUserByIdSuccess(state, action) {
            state.userById = action.payload ? action.payload : {};
            state.isUserByIdLoading = false;
            state.isUserByIdError = false;
        },
        getUserByIdFailure(state, action) {
            state.userById = {};
            state.isUserByIdLoading = false;
            state.isUserByIdError = true;
        },



        // user followers:-
        getUserFollowersRequest(state) {
            state.isUsersFollowersLoading = true;
            state.isUsersFollowersError = false;
        },
        getUserFollowersSuccess(state, action) {
            state.userFollowers = action.payload ? action.payload : [];
            state.isUsersFollowersLoading = false;
            state.isUsersFollowersError = false;
        },
        getUserFollowersFailure(state, action) {
            state.userFollowers = [];
            state.isUsersFollowersLoading = false;
            state.isUsersFollowersError = true;
        },



        // user followings:-
        getUserFollowingsRequest(state) {
            state.isUsersFollowingsLoading = true;
            state.isUsersFollowingsError = false;
        },
        getUserFollowingsSuccess(state, action) {
            state.userFollowings = action.payload ? action.payload : [];
            state.isUsersFollowingsLoading = false;
            state.isUsersFollowingsError = false;
        },
        getUserFollowingsFailure(state, action) {
            state.userFollowings = [];
            state.isUsersFollowingsLoading = false;
            state.isUsersFollowingsError = true;
        },

        // user friends:-
        getUserFriendsRequest(state) {
            state.isUsersFriendsLoading = true;
            state.isUsersFriendsError = false;
        },
        getUserFriendsSuccess(state, action) {
            state.userFriends = action.payload ? action.payload : [];
            state.isUsersFriendsLoading = false;
            state.isUsersFriendsError = false;
        },
        getUserFriendsFailure(state, action) {
            state.userFriends = [];
            state.isUsersFriendsLoading = false;
            state.isUsersFriendsError = true;
        },


        // user viewers:-
        getUserViewersRequest(state) {
            state.isUsersViewersLoading = true;
            state.isUsersViewersError = false;
        },
        getUserViewersSuccess(state, action) {
            state.userViewers = action?.payload ? action?.payload?.viewers : [];
            state.totalViewerPages = action?.payload?.totalPages || 1;
            state.isUsersViewersLoading = false;
            state.isUsersViewersError = false;
        },
        getUserViewersFailure(state, action) {
            state.userViewers = [];
            state.isUsersViewersLoading = false;
            state.isUsersViewersError = true;
        },

        // Get All User Rewards:-
        getUserRewardsRequest(state) {
            state.isUserRewardsLoading = true;
            state.isUserRewardsError = false;
        },
        getUserRewardsSuccess(state, action) {
            state.userRewards = action.payload ? action.payload : [];
            state.isUserRewardsLoading = false;
            state.isUserRewardsError = false;
        },
        getUserRewardsFailure(state, action) {
            state.userRewards = [];
            state.isUserRewardsLoading = false;
            state.isUserRewardsError = true;
        },
    },
});


export const {

    getUserRequest,
    getUserSuccess,
    getUserFailure,

    getUserByIdRequest,
    getUserByIdSuccess,
    getUserByIdFailure,

    getUserFollowersRequest,
    getUserFollowersSuccess,
    getUserFollowersFailure,

    getUserFollowingsRequest,
    getUserFollowingsSuccess,
    getUserFollowingsFailure,

    getUserFriendsRequest,
    getUserFriendsSuccess,
    getUserFriendsFailure,

    getUserViewersRequest,
    getUserViewersSuccess,
    getUserViewersFailure,

    getUserRewardsRequest,
    getUserRewardsSuccess,
    getUserRewardsFailure,

} = usersSlice.actions;

export default usersSlice.reducer;
