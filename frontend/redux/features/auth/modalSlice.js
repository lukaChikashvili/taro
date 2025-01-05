import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    showModal: false
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setShowModal: (state) => {
            state.showModal = true;
        },

        hideModal: (state) => {
            state.showModal = false;

        },

        toggleModal: (state) => {
            state.showModal= !state.showModal;

        }

    }
});


export const { showModal, hideModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

