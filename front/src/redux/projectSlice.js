import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    onProject: null,
}

const projectSlice = createSlice ({
    name: 'projects',
    initialState,
    reducers: {
        AddNewProject:(state, action) => {
            state.projects = [...state.projects, action.payload];
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setOnProject: (state, action) => {
            state.onProject = action.payload;
        }
    }
})

export const { AddNewProject, setProjects, setOnProject } = projectSlice.actions;
export default projectSlice.reducer;