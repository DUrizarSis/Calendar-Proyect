import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import eventMiniReducer from './eventMiniSlice';
import showFormReducer from './showFormSlice';

const store = configureStore({
    reducer: {
        events: eventReducer,
        userEvents: userReducer,
        eventMini: eventMiniReducer,
        showForm: showFormReducer
    }
})

export default store;