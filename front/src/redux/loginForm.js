import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLogin: false,
    logUserData: {}
}

export const loginFormSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        AddShowLogin:(state, action) => {
            state.showLogin = action.payload;
        },
        AddUserData: (state, action) => {
            state.logUserData = action.payload;
        }
    }
});

export const { AddShowLogin, AddUserData } = loginFormSlice.actions;
export default loginFormSlice.reducer;