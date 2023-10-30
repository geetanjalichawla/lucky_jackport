import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginFailure, loginRequest, loginSuccess } from "./authenticationSlice";
import axios from "axios";
const api = process.env.REACT_APP_BASE_URL;


// Login Function:-
export const loginFunction = (payload, navigate, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    dispatch(loginRequest());
    axios.post(`${api}/agent/login`, payload)
        .then((response) => {
            console.log({ response });
            localStorage.setItem("bat_token", response?.data?.token);
            dispatch(loginSuccess(response?.data));
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

