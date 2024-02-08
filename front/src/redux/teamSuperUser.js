import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    team: [],
    projects: [],
    indexProject: 0,
}

export const teamSuperUserSlice = createSlice({
    name: "teamSuperUser",
    initialState,
    reducers: {
        AddTeam:(state, action) => {
            const superU = action.payload.superU;
            const filteredObjects = action.payload.team.filter(objeto => objeto.projectCreator === superU);
            state.team = filteredObjects.map(objeto => ({ name: objeto.name, _id: objeto._id, team: objeto.team }));
        },
        addProject:(state, action) => {
            state.projects = action.payload;
        },
        selectProject:(state, action) => {
            state.indexProject = action.payload;
        }
    }
});

export const { AddTeam, addProject, selectProject } = teamSuperUserSlice.actions;
export default teamSuperUserSlice.reducer;