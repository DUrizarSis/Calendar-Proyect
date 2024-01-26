import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';

const store = configureStore({
    reducer: {
        events: eventReducer,
        userEvents: userReducer,
    }
})

export default store;