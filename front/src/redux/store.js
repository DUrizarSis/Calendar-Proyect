import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import eventMiniReducer from './eventMiniSlice';

const store = configureStore({
    reducer: {
        events: eventReducer,
        userEvents: userReducer,
        eventMini: eventMiniReducer
    }
})

export default store;