import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3001/api/'

/// Thunk

// Get events
export const getUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    const response = await axios(`${URL}users`)
    return response.data
  }
)


//Handle actions reducer

const initialState = {
    users: []
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
})


export default userSlice.reducer;