import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: []
}

const projectSlice = createSlice ({
    name: 'projects',
    initialState,
    reducers: {
        AddNewProject:(state, action) => {
            state.projects = [...state.projects, action.payload];
        }
    }
})

export const { AddNewProject } = projectSlice.actions;
export default projectSlice.reducer;