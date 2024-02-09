import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectSuper: false,
    projectUser: false
}

export const confirmEmpySlice = createSlice({
    name: "confirmEmpy",
    initialState,
    reducers: {
        confirmSuper:(state, action) => {
            state.projectSuper = action.payload;
        },
        confirmUser:(state, action) => {
            state.projectUser = action.payload;
        }
    }
});

export const { confirmSuper, confirmUser } = confirmEmpySlice.actions;
export default confirmEmpySlice.reducer;