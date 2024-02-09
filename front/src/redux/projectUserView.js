import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    team: [],
    projects: [],
    indexProject: 0,
}

export const projectUserViewSlice = createSlice({
    name: "projectUserView",
    initialState,
    reducers: {
        addProjectUser:(state, action) => {
            const user = action.payload.user._id;
            const team = action.payload.team;
            
            const filteredProjects = team.filter(project =>
                project.team.some(teamMember => teamMember === user)
            );

            state.projects = filteredProjects

        },
        addProject2:(state, action) => {
            state.projects = action.payload;
        },
        selectProjectUser:(state, action) => {
            state.indexProject = action.payload;
        },
    }
});

export const { addProjectUser, selectProjectUser } = projectUserViewSlice.actions;
export default projectUserViewSlice.reducer;