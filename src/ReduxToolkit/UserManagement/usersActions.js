import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {
    getUserProfileRequest,
    getUserProfileSuccess,
    getUserProfileFailure,

} from "./usersSlice";
const api = process.env.REACT_APP_BASE_URL;



export const getUserProfileFunc = () => (dispatch) => {
    const token = localStorage.getItem("bet_token");
    dispatch(getUserProfileRequest());
    axios.get(`${api}/agent/my-profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response);
            dispatch(getUserProfileSuccess(response?.data?.user));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserProfileFailure(e?.response?.data?.message || e?.message));
        });
};


export const pointTransferFunction = (payload, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    const token = localStorage.getItem("bet_token");
    axios.post(`${api}/coin-transfer-for-user`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log({ response });
            toast.success('Coin transfer', {
                autoClose: 1500,
                position: 'top-center',
            });
            resetFormData();
            setLoading(false);
            dispatch(getUserProfileFunc());
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