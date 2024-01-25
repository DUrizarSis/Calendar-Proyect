import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs';
import './App.css';

function App() {

  const localizer = dayjsLocalizer(dayjs)

  return (
    <div className="App">
        <h1>Calendar</h1>

        <Calendar
        localizer={localizer}
        />

    </div>
  );
}

export default App;
