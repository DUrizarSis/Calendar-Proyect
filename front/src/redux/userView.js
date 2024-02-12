import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {}
}

export const userViewSlice = createSlice({
    name: "userView",
    initialState,
    reducers: {
        addUserView: (state, action) => {
            state.userData = action.payload;
        },
        
    }
});

export const { addUserView } = userViewSlice.actions;
export default userViewSlice.reducer;