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
        addViewMini:(state, action) => {
            state.viewDay = action.payload;
        }
    }
});

export const { addEventMini, addViewMini } = eventMiniSlice.actions;
export default eventMiniSlice.reducer;