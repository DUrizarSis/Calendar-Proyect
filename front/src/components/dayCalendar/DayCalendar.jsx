import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./dayCalendar.module.css";
import { useSelector } from 'react-redux';

const DayCalendar = () => {
    const localizer = dayjsLocalizer(dayjs);
      //Event state global
    const eventState = useSelector(state => state.events);
    //Events state
      const events = eventState.events;

    console.log(events)
    return (
        <div className={Styles.container}>
            <h1>Day calendar</h1>
            <Calendar
                localizer={localizer}
                views={['day']}
                defaultView={'day'}
                events={events}
            />
        </div>
    )
}

export default DayCalendar;