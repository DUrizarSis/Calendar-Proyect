import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./miniCalendar.module.css";
import { useSelector } from 'react-redux';

function MiniCalendar() {

  const localizer = dayjsLocalizer(dayjs);
  const eventState = useSelector(state => state.events);
  const events = eventState.events;
  return (
    <div className={Styles.container}>
      <h1>Mini Calendar</h1>
      <Calendar
      localizer={localizer}
      events={events}
      views={['month']}
      />

    </div>
  );
}

export default MiniCalendar;