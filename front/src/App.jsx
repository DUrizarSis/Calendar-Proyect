
import MyCalendar from './components/calendar/MyCalendar';
import MiniCalendar from './components/miniCalendar/MiniCalendar';
import DayCalendar from './components/dayCalendar/DayCalendar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { getUsers } from './redux/userSlice';
import { getEvent } from './redux/eventSlice';
import { addViewMini } from './redux/eventMiniSlice';
import { AddMode,addSelectedEvent,addShowForm } from './redux/showFormSlice';

function App() {

  const dispatch = useDispatch();
  const usersState = useSelector(state => state.usersEvents);
  const { showForm, selectedEvent, mode } = useSelector(state => state.showForm);
  const changeView = useSelector(state => state.eventMini.viewDay);
  // const users = usersState.users;
  
  const handleViewCalendar = ( data ) =>{
    dispatch(addViewMini(data))
  }

  const eventStyleGetter = (event) => {
    let newStyle = {
      backgroundColor: event.color,
      opacity: 0.9,
      color: "black"
    }
    return {
      style: newStyle
    }
  }

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleSelectEvent = (selectedEvent) => {
    console.log('Selected Event:', selectedEvent);
    dispatch(getEvent(selectedEvent._id));
    dispatch(addSelectedEvent(selectedEvent));
    dispatch(AddMode('edit'));
    dispatch(addShowForm(true));
  };

  const handleShowForm = (event) => {
    console.log('Handle Show Form - Event:', event);
    dispatch(addSelectedEvent(event));
    dispatch(AddMode('add'));
    dispatch(addShowForm(true));
  };

  const handleCloseForm = () => {
    console.log('Handle Close Form');
    dispatch(addSelectedEvent(null));
    dispatch(addShowForm(false));
  };

  return (
    <div className="app">
      {changeView ? (
        <div className='calendarContainer'>
          <button onClick={() => handleViewCalendar(false)}>vista DayCalendar</button>
          <MyCalendar
            eventStyleGetter={eventStyleGetter}
            handleSelectEvent={handleSelectEvent}
            handleShowForm={handleShowForm}
            handleCloseForm={handleCloseForm}
          />
        </div>
      ) : (
        <div className='calendarContainer'>
          <button onClick={() => handleViewCalendar(true)}>vista Calendar Princial</button>
          <div className='miniDayContainer'>
            <MiniCalendar
              eventStyleGetter={eventStyleGetter}
              handleCloseForm={handleCloseForm}
            />
            <DayCalendar
              eventStyleGetter={eventStyleGetter}
              handleSelectEvent={handleSelectEvent}
              handleShowForm={handleShowForm}
              handleCloseForm={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
