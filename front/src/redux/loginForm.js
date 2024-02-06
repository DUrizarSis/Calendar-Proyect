import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLogin: false,
}

export const loginFormSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        AddShowLogin:(state, action) => {
            state.showLogin = action.payload;
        }
    }
});

export const { AddShowLogin } = loginFormSlice.actions;
export default loginFormSlice.reducer;