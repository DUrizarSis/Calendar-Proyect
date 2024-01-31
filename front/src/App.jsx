
import MyCalendar from './components/calendar/MyCalendar';
import MiniCalendar from './components/miniCalendar/MiniCalendar';
import DayCalendar from './components/dayCalendar/DayCalendar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from './redux/userSlice';
import { addViewMini } from './redux/eventMiniSlice';


function App() {

  const dispatch = useDispatch();
  const usersState = useSelector(state => state.usersEvents);
  const changeView = useSelector(state => state.eventMini.viewDay);
  
  // const users = usersState.users;
  
  const handleViewCalendar = ( data ) =>{
    dispatch(addViewMini(data))
  }

  const eventStyleGetter =  (event) => {
    let newStyle = {
      backgroundColor: event.color,
      opacity: 0.9,
      color: "black",
    };

    return {
      style: newStyle
    };
  }

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="App">

      {changeView ?  <div>
                        <button onClick={()=>handleViewCalendar(false)}>vista DayCalendar</button>
                        <MyCalendar eventStyleGetter={eventStyleGetter}/>
                      </div>
                      :
                      <div>
                        <button onClick={()=>handleViewCalendar(true)}>vista Calendar Princial</button>
                        <MiniCalendar eventStyleGetter={eventStyleGetter}/>
                        <DayCalendar eventStyleGetter={eventStyleGetter}/>
                      </div>
      }


    </div>
  );
}

export default App;
