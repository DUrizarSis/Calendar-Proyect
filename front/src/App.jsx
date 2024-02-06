
import MyCalendar from './components/calendar/MyCalendar';
import LoginForm from './components/loginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';
import MiniCalendar from './components/miniCalendar/MiniCalendar';
import DayCalendar from './components/dayCalendar/DayCalendar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { getUsers } from './redux/userSlice';
import { getEvent } from './redux/eventSlice';
import { addViewMini } from './redux/eventMiniSlice';
import { AddMode,addSelectedEvent,addShowForm } from './redux/showFormSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";

function App() {

  const dispatch = useDispatch();
  const usersState = useSelector(state => state.usersEvents);
  const { showForm, selectedEvent, mode } = useSelector(state => state.showForm);
  const changeView = useSelector(state => state.eventMini.viewDay);
  // const users = usersState.users;
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const [register, setRegister] = useState(true);
  const handleViewCalendar = ( data ) =>{
    dispatch(addViewMini(data))
  }

  const eventStyleGetter = (event) => {
    let newStyle = {
      backgroundColor: event.color,
      color: "black",
      fontWeight: "bold"
    }
    return {
      style: newStyle
    }
  }
  
  useEffect(() => {
    dispatch(getUsers());
    dispatch(addViewMini(true))
  }, []);

  // useEffect(() => {
  //   !access && navigate('/login');
  // }, [access]);

  const handleSelectEvent = (selectedEvent) => {
    console.log('Selected Event:', selectedEvent);
    dispatch(getEvent(selectedEvent._id));
    dispatch(addSelectedEvent(selectedEvent));
    dispatch(AddMode('edit'));
    dispatch(addShowForm(true));
  };

  const handleShowForm = (event) => {
    const startISO = new Date(event.start).toISOString();
    const endISO = new Date(event.end).toISOString();
    const slotsISO = event.slots.map(slot => new Date(slot).toISOString());
  
    const eventData = {
      ...event,
      start: startISO,
      end: endISO,
      slots: slotsISO,
    };
  
    dispatch(addSelectedEvent(eventData));
    dispatch(AddMode('add'));
    dispatch(addShowForm(true));
  };

  const handleCloseForm = () => {
    console.log('Handle Close Form');
    dispatch(addSelectedEvent(null));
    dispatch(addShowForm(false));
  };

  const login = async (useData)=>{
    try {
      const {data} = await axios(`http://localhost:5000/api/user?username=${useData.username}&password=${useData.password}`)
      const {access, logUser} = data;
      
      if(access) {
        setAccess(true);
        navigate('/home');

      }

    } catch (error) {
      window.alert(error.response.data.message + ', cree una cuenta')
    }
  }

  const checkIn = async (useData)=>{
    try {
      const {email, username, image, password, isSuperuser} = useData;
      const dataSend = {email, username, image, password, isSuperuser};

      const {data} = await axios.post(`http://localhost:5000/api/new-user`, dataSend);
      
      if(data.access) {
        setRegister(true)
        navigate('/login')
        window.alert('El usuario '+ data.user.username + ', se creo exitosamente.')
      }
    } catch (error) {
      // window.alert(error.response.data.error + ', cree una cuenta')
      console.log(error)
    }
  }

  return (
    <div className="app">

      {/* {changeView ? ( */}
        {/* <div className='calendarContainer'> */}
          {/* <button onClick={() => handleViewCalendar(false)}>vista DayCalendar</button>
          <MyCalendar
            eventStyleGetter={eventStyleGetter}
            handleSelectEvent={handleSelectEvent}
            handleShowForm={handleShowForm}
            handleCloseForm={handleCloseForm}
          />
        </div>
      ) : ( */}
        <div className='calendarContainer'>

          <Routes>
            <Route path='/login' element={<LoginForm login={login}/>}/>
            <Route path='/register' element={<RegisterForm checkIn={checkIn}/>}/>
            <Route path='/home' element={
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
            }></Route>
          </Routes>
          {/* <button onClick={() => handleViewCalendar(true)}>vista Calendar Princial</button> */}

        </div>
      {/* ) */}
      {/* } */}
    </div>
  );
}

export default App;
