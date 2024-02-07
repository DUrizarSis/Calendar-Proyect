import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import eventMiniReducer from './eventMiniSlice';
import showFormReducer from './showFormSlice';
import loginFormSlice from './loginForm';
import projectSlice from './projectSlice';

const store = configureStore({
    reducer: {
        events: eventReducer,
        userEvents: userReducer,
        eventMini: eventMiniReducer,
        showForm: showFormReducer,
        loginForm: loginFormSlice,
        projects: projectSlice,
    }
})

export default store;