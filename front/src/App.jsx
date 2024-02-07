
import LoginForm from './components/loginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';
import MiniCalendar from './components/miniCalendar/MiniCalendar';
import DayCalendar from './components/dayCalendar/DayCalendar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { getEvent } from './redux/eventSlice';
import { AddMode,addSelectedEvent,addShowForm } from './redux/showFormSlice';
import { Routes, Route, useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import { AddShowLogin, AddUserData } from './redux/loginForm';
import Nav from './components/nav/Nav';
import UserView from './components/userView/UserView';
import { addUserView } from './redux/userView';
import ProjectsForm from "./components/projectsForm/ProjectsForm";
import { getUsers } from './redux/userSlice';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [register, setRegister] = useState(false);
  const user = useSelector(state => state.userView.userData);

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


  // empecia el codigo para manejar el loginForm y registerForm
  useEffect(() => {

      const storedAccess = localStorage.getItem('access');
      const userJSON = localStorage.getItem('useData');
      const useData = JSON.parse(userJSON);

      if (storedAccess === 'true') {
        login(useData)
      }

  
    if (!storedAccess) {
      navigate('/');
    } 

  }, []);
  
  const login = async (useData)=>{
    try {
      const {data} = await axios(`http://localhost:5000/api/user?username=${useData.username}&password=${useData.password}`)
      const {access, user} = data;

      if(access) {
        localStorage.setItem('access', 'true');
        localStorage.setItem('useData', JSON.stringify(useData));
        navigate('/home');
        dispatch(AddUserData(user))
        dispatch(addUserView(user));
        dispatch(getUsers());
      }

    } catch (error) {
      window.alert(error.response.data.message + ', cree una cuenta')
    }
  }

  const logout = ()=>{
    localStorage.setItem('access', 'false');
    localStorage.setItem('useData', 'null')
    
    navigate('/');
    dispatch(AddShowLogin(false))
  }

  const checkIn = async (useData)=>{
    try {
      const {email, username, image, password, isSuperuser} = useData;
      const dataSend = {email, username, image, password, isSuperuser};

      const {data} = await axios.post(`http://localhost:5000/api/new-user`, dataSend);
      
      if(data.access) {
        setRegister(true)
        setRegister(false)
        window.alert('El usuario '+ data.user.username + ', se creo exitosamente.')
      }
    } catch (error) {
      // window.alert(error.response.data.error + ', cree una cuenta')
      console.log(error)
    }
  }

  const handleRegister = ()=>{
    setRegister(!register)
  }

  return (
    <div className="app">
        <div className='calendarContainer'>
          {location.pathname !== "/" && <Nav logout={logout}/>}

          <Routes>
          {
          !register ? <Route path='/' element={<LoginForm login={login} handleRegister={handleRegister}/>}/>
                    : <Route path='/' element={<RegisterForm checkIn={checkIn} handleRegister={handleRegister}/>}/>
          }

            <Route path='/projects' element={<ProjectsForm/>}/>
            <Route path='/home' element={

              <div className='miniDayContainer'>
                <div className='containerMini-User'>
                  <MiniCalendar
                    handleCloseForm={handleCloseForm}
                  />
                  {user.isSuperuser === true && <UserView/>}
                </div>
                <DayCalendar
                  eventStyleGetter={eventStyleGetter}
                  handleSelectEvent={handleSelectEvent}
                  handleShowForm={handleShowForm}
                  handleCloseForm={handleCloseForm}
                />
              </div>
            }></Route>
          </Routes>

        </div>
    </div>
  );
}

export default App;
