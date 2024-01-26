import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3001/api/'

/// Thunk

// Get events
export const getEvents = createAsyncThunk(
  'events/getAllEvents',
  async () => {
    const response = await axios(`${URL}get-events`)
    return response.data
  }
)

// Get One Event
export const getEvent = createAsyncThunk(
    'events/getOneEvent',
    async (idEvent) => {
        const response = await axios(`${URL}get-events/${idEvent}`)
        return response.data
    }
)

// Add Event
export const addEvent = createAsyncThunk(
    'events/addOneEvent',
    async (newEvent) => {
        const response = await axios.post(`${URL}create-event/`, newEvent)
        return response.data
    }
)

// Update Event
export const updateEvent = createAsyncThunk(
    'events/updateOneEvent',
    async (id, updateEvent) => {
        const response = await axios.put(`${URL}put-events/${id}`, updateEvent)
        return response.data
    }
)

// Delete Event
export const deleteEvent = createAsyncThunk(
    'events/deleteOneEvent',
    async (id) => {
        const response = await axios.delete(`${URL}delete-events/${id}`)
        return response.data
    }
)



//Handle actions reducer

const initialState = {
    events: [],
    onEvent: []
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.events = action.payload
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
        state.onEvent = action.payload
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
        state.events = [...state.events, action.payload];
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((event) => event.id === action.payload.id);
    
        if (index !== -1) {
            state.events[index] = action.payload;
        }
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id != action.payload.id)
    });
  },
})


export default eventSlice.reducer;
