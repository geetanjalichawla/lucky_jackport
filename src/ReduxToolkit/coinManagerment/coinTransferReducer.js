import { createReducer } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    receivables: [],
    transferable: [],
    transactions: [],
};



const coinTransfer = createSlice({
    name: 'coinTransfer',
    initialState,
    reducers: {
        getReceivable: (state) => {
            state.loading = true;
        },
        getReceivableSuccess: (state, action) => {
            state.loading = false;
            state.receivables = action.payload;
        },
        getReceivableFail: (state, action) => {
            state.loading = false;
        },
        getTransferable: (state) => {
            state.loading = true;
        },
        getTransferableSuccess: (state, action) => {
            state.loading = false;
            state.transferable = action.payload;
        },
        getTransferableFail: (state, action) => {
            state.loading = false;
        },
        getMyTransactionHistory: (state) => {
            state.loading = true;
        },
        getMyTransactionHistorySuccess: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        },
        getMyTransactionHistoryFail: (state, action) => {
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },

        setError: (state, action) => {
            state.error = action.payload
        },
        addMessage: (state, action) => {
            state.message = action.payload
        },
    }
}
);


export const {

    getReceivable,
    getReceivableSuccess,
    getReceivableFail,
    getTransferable,
    getTransferableSuccess,
    getTransferableFail,
    getMyTransactionHistory,
    getMyTransactionHistorySuccess,
    getMyTransactionHistoryFail,
    clearError,
    clearMessage,
    setError,
    addMessage,

} = coinTransfer.actions;

export default coinTransfer.reducer;
