
import MyCalendar from './components/calendar/MyCalendar';
import MiniCalendar from './components/miniCalendar/MiniCalendar';
import DayCalendar from './components/dayCalendar/DayCalendar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from './redux/userSlice';


function App() {

  const dispatch = useDispatch();
  const usersState = useSelector(state => state.usersEvents);
  
  // const users = usersState.users;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="App">

        {/* <MyCalendar/> */}
        <MiniCalendar/>
        <DayCalendar/>

    </div>
  );
}

export default App;
