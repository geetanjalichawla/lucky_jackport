import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginFailure, loginRequest, loginSuccess, logoutRequest, logoutSuccess } from "./authenticationSlice";
import axios from "axios";
const api = process.env.REACT_APP_BASE_URL;


// Login Function:-
export const loginFunction = (payload, navigate, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    dispatch(loginRequest());
    axios.post(`${api}/agent/login`, payload)
        .then((response) => {
            console.log({ response });
            dispatch(loginSuccess(response?.data));
            if (response?.data) {
                toast.success('Login Successful!', {
                    autoClose: 1500,
                    position: 'top-center',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                });
            }
        })
        .then(() => {
            setLoading(false);
            resetFormData();
            navigate(`/dashboard`);
        })
        .catch((e) => {
            setLoading(false);
            console.log({ e });
            dispatch(loginFailure(e?.response?.data?.message || e?.message));
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
};


export const logOutFunction = (navigate) => (dispatch) => {
    dispatch(logoutSuccess());
    navigate('/');
};


export const resetPasswordFunction = (payload, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    const token = localStorage.getItem("bet_token");
    axios.put(`${api}/resetAgentOrUserPassword`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log({ response });
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            resetFormData();
            setLoading(false);
        })
        .catch((e) => {
            setLoading(false);
            console.log({ e });
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
};


export const resetPinFunction = (payload, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    const token = localStorage.getItem("bet_token");
    axios.put(`${api}/resetAgentOrUserPin`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log({ response });
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            resetFormData();
            setLoading(false);
        })
        .catch((e) => {
            setLoading(false);
            console.log({ e });
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
};