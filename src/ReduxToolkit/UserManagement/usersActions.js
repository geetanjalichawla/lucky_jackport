import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {

    getUserViewersRequest,
    getUserViewersSuccess,
    getUserViewersFailure,

    getUserFailure,
    getUserRequest,
    getUserSuccess,

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

    getUserRewardsRequest,
    getUserRewardsSuccess,
    getUserRewardsFailure,

} from "./usersSlice";
import { getUserProfileFunc } from '../UserProfile/userProfileActions';
const api = process.env.REACT_APP_BASE_URL;


// Get All Users:-
export const getAllUsersFunc = (navigate) => (dispatch) => {
    const token = localStorage.getItem("bet_token");
    dispatch(getUserRequest());
    axios.get(`${api}/get-all-users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response);
            dispatch(getUserSuccess(response?.data?.users));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserFailure(e?.response?.data?.message || e?.message));
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
        });
}


// Get All Users Followers:-
export const getUsersFollowersFunc = (userId, navigate) => (dispatch) => {
    const params = { page: 1 };
    const token = localStorage.getItem("bet_token");
    dispatch(getUserFollowersRequest());
    axios.get(`${api}/get-users-followers/${userId}`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response?.data);
            dispatch(getUserFollowersSuccess(response?.data?.followers));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserFollowersFailure(e?.response?.data?.message || e?.message));
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
        });
}



// Get All Users Followings:-
export const getUsersFollowingsFunc = (userId, navigate) => (dispatch) => {
    const params = { page: 1 };
    const token = localStorage.getItem("bet_token");
    dispatch(getUserFollowingsRequest());
    axios.get(`${api}/get-users-followings/${userId}`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response?.data);
            dispatch(getUserFollowingsSuccess(response?.data?.followings));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserFollowingsFailure(e?.response?.data?.message || e?.message));
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
        });
}


// Get my friends:-
export const getUsersFriendsFunc = (userId, params, navigate) => (dispatch) => {
    const token = localStorage.getItem("bet_token");
    dispatch(getUserFriendsRequest());
    axios.get(`${api}/get-user-friends/${userId}`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            dispatch(getUserFriendsSuccess(response?.data?.friends));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserFriendsFailure(e?.response?.data?.message || e?.message));
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
        });
};


export const getUserViewersFunc = (userId, params, navigate) => (dispatch) => {
    const token = localStorage.getItem("bet_token");
    dispatch(getUserViewersRequest());
    axios.get(`${api}/get-user-viewers/${userId}`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            dispatch(getUserViewersSuccess(response?.data));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserViewersFailure(e?.response?.data?.message || e?.message));
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
        });
};




// Profile Status Change Function:-
export const changeProfileStatusFunc = (id, payload, navigate, setLoad) => async (dispatch) => {
    const token = localStorage.getItem("bet_token");
    axios.put(`${api}/change-my-profile-status/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            setLoad(false);
            dispatch(getAllUsersFunc(navigate));
        })
        .catch((e) => {
            console.log({ e });
            setLoad(false);
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
            else {
                toast.error(e?.response?.data?.message || e?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                });
            }
        });
};



// Status Change Function:-
export const changeStatusFunc = (userId, payload, navigate, setLoad) => async (dispatch) => {
    const token = localStorage.getItem("bet_token");
    axios.put(`${api}/ban-active-user/${userId}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            setLoad(false);
            dispatch(getAllUsersFunc(navigate));
        })
        .catch((e) => {
            console.log({ e });
            setLoad(false);
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
            else {
                toast.error(e?.response?.data?.message || e?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                });
            }
        });
};


// Role Change Function:-
export const changeUserRoleFunc = (userId, payload, navigate) => async (dispatch) => {
    const token = localStorage.getItem("bet_token");
    axios.put(`${api}/change-user-role/${userId}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            dispatch(getAllUsersFunc(navigate));
        })
        .catch((e) => {
            console.log({ e });
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
            else {
                toast.error(e?.response?.data?.message || e?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                });
            }
        });
};


// update User Function:- 
export const updateUserFunc = (userId, payload, navigate, resetFormData, setLoad) => async (dispatch) => {
    const token = localStorage.getItem("bet_token");
    axios.patch(`${api}/update-user/${userId}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':  `multipart/form-data`,
        }
    })
        .then((response) => {
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
        })
        .then(() => {
            dispatch(getAllUsersFunc(navigate));
            dispatch(getUserProfileFunc(navigate));
            setLoad(false);
            resetFormData();
            navigate('/user-management');
        })
        .catch((e) => {
            console.log({ e });
            setLoad(false);
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
            else {
                toast.error(e?.response?.data?.message || e?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                });
            }
        });
};



// Get user By Id:-
export const getUserByIdFunc = (id, navigate) => (dispatch) => {
    const token = localStorage.getItem("bet_token");
    if (id) {
        dispatch(getUserByIdRequest());
        axios.get(`${api}/get-user-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                dispatch(getUserByIdSuccess(response?.data?.user));
            })
            .catch((e) => {
                console.log({ e });
                dispatch(getUserByIdFailure(e?.response?.data?.message || e?.message));
                if (e?.response?.data?.message === 'Token expired') {
                    navigate('/auth-error');
                }
            });
    }
    else {
        toast.error('User id is missing in action', {
            autoClose: 1500,
            position: 'top-center',
        });
    }
};

// get-my-user-rewards
export const getUserRewardsFunc = (userId, params, navigate) => (dispatch) => {
    const token = localStorage.getItem("bet_token");
    dispatch(getUserRewardsRequest());
    axios.get(`${api}/get-user-rewards-by-user-id/${userId}`, {
        params: params,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            dispatch(getUserRewardsSuccess(response?.data['user-reward']));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserRewardsFailure(e?.response?.data?.message || e?.message));
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/auth-error');
            }
        });
};




export const deleteUserFunc = (id, navigate) => async (dispatch) => {
    const token = localStorage.getItem("bet_token");
    if (id) {
        axios.delete(`${api}/delete-user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                toast.success(response?.data?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                });
            })
            .then(() => dispatch(getAllUsersFunc(navigate)))
            .catch((e) => {
                console.log({ e });
                if (e?.response?.data?.message === 'Token expired') {
                    navigate('/auth-error');
                }
                else {
                    toast.error(e?.response?.data?.message || e?.response?.data?.error, {
                        autoClose: 1500,
                        position: 'top-center',
                    });
                }
            });
    }
    else {
        toast.error('Something went wrong with user id!', {
            autoClose: 1500,
            position: 'top-center',
        });
    }
};

