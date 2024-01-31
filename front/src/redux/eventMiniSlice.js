import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    viewDay: false,
    date: null
}

export const eventMiniSlice = createSlice({
    name: "eventMini",
    initialState,
    reducers: {
        addEventMini:(state, action) => {
            state.date = action.payload;
        },

    }
});

export const { addEventMini } = eventMiniSlice.actions;
export default eventMiniSlice.reducer;