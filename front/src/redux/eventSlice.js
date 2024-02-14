import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const URL = 'http://localhost:5000/api/'

/// Thunk

// Get events
export const getEvents = createAsyncThunk(
    'events/getAllEvents',
    async (userId) => { 
      try {
        const response = await axios.get(`${URL}get-events/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
    }
  );

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
        return response.data.event
    }
)

// Update Event
export const updateEvent = createAsyncThunk(
    'events/updateOneEvent',
    async ({ id, updateEvent }) => {
      const response = await axios.put(`${URL}put-events/${id}`, updateEvent);
      return response.data.event;
    }
);

// Get events for idUser and Project
export const getEventsforProjectAndIdUser = createAsyncThunk(
  'events/getEventForIdUserAndIdProject',
  async ({idUser, idProject}) => { 

    try {
      const response = await axios.get(`${URL}projects-events?idUser=${idUser}&idProject=${idProject}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


// Delete Event
export const deleteEvent = createAsyncThunk(
    'events/deleteOneEvent',
    async ({id}) => {
        const response = await axios.delete(`${URL}delete-events/${id}`)
        return response.data.event
    }
)

//Handle actions reducer

const initialState = {
    events: [],
    backupEvents: [],
    onEvent: [],
    errorMessage: null,
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    eventsForProject: (state, action) => {
      console.log(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.backupEvents = state.events
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
        state.onEvent = action.payload
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
        state.events = [...state.events, action.payload];
        state.backupEvents = state.events
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((event) => event._id === action.payload._id);
    
        if (index !== -1) {
            state.events[index] = action.payload;
            state.backupEvents = state.events
        }
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id != action.payload._id);
        state.backupEvents = state.events
    });
    builder.addCase(getEventsforProjectAndIdUser.fulfilled, (state, action) => {

      if(action.payload.message){
        state.errorMessage = action.payload.message;
        state.events = [];
      }else{
        state.events = action.payload;
        state.errorMessage = null
      }

    });
  },
})

export const { addErrorMessage } = eventSlice.actions;
export default eventSlice.reducer;
