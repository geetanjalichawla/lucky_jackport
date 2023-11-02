import axios from "axios";
import { getReceivable, getTransferable, getReceivableSuccess, getReceivableFail, getTransferableSuccess, getTransferableFail, addMessage, setError } from './coinTransferReducer'; // Import the action creators from your slice


export const getReceivableAction = () => async (dispatch) => {
  dispatch({ type: getReceivable.type }); // Dispatch the action from your slice

  try {
    const isAuth = localStorage.getItem('bet_token');

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/my-receivables-for-user`, {
      headers: {
        'Authorization': `Bearer ${isAuth}`
      },
    });

    dispatch({ type: getReceivableSuccess.type, payload: response.data.receivables });
  } catch (error) {
    dispatch({ type: getReceivableFail.type });
  }
};

export const getTransferableAction = () => async (dispatch) => {
    dispatch({ type: getTransferable.type});

    try {
      const isAuth = localStorage.getItem('bet_token');
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/my-transferable-for-user`, {
        headers: {
          'Authorization': `Bearer ${isAuth}`
        },
      });
      dispatch({ type: getTransferableSuccess.type, payload: response.data.transferable });
        } catch (error) {
      dispatch({type:getTransferableFail.type});
    }
};

export const acceptTransaction = (id) => async (dispatch) => {
  try {
    const isAuth = localStorage.getItem('bet_token');

    await axios.post(`${process.env.REACT_APP_BASE_URL}/accept-transferable-for-user`, { transactionId: id }, {
      headers: {
        'Authorization': `Bearer ${isAuth}`
  }});
    
    dispatch(addMessage( 'Accepted successfully' ));

    // Dispatch the actions from your slice
    dispatch(getReceivableAction());
    dispatch(getTransferableAction());
  } catch (error) {
    dispatch(setError( error?.response?.data?.message || 'Can\'t accept . Please retry' ));
    dispatch(getTransferableAction());
    dispatch(getReceivableAction());


  }
};

export const rejectTransaction = (id) => async (dispatch) => {
  try {
    const isAuth = localStorage.getItem('bet_token');

    await axios.post(`${process.env.REACT_APP_BASE_URL}/reject-transferable-for-user`, { transactionId: id }, {
      headers: {
        'Authorization': `Bearer ${isAuth}`
      }});
    
    dispatch(addMessage('Rejected successfully'));

    // Dispatch the actions from your slice
    dispatch(getReceivable());
    dispatch(getTransferable());
  } catch (error) {
    dispatch(setError( error?.response?.data?.message || 'Can\'t reject. Please retry' ));
  }
};
