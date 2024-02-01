import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showForm: false,
    selectedEvent: null,
    mode:''
}

export const showFormSlice = createSlice({
    name: "showForm",
    initialState,
    reducers: {
        addShowForm:(state, action) => {
            state.showForm = action.payload;
        },
        addSelectedEvent:(state, action) => {
            state.selectedEvent = action.payload;
        },
        AddMode:(state, action) => {
            state.mode = action.payload;
        }
    }
});

export const { addSelectedEvent, addShowForm, AddMode} = showFormSlice.actions;
export default showFormSlice.reducer;