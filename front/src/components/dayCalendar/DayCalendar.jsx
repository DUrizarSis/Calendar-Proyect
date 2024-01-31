import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./dayCalendar.module.css";
import { useSelector } from 'react-redux';
import { useState } from "react";

const DayCalendar = () => {
const [date, setDate] = useState({});

  const dateMini= useSelector(state=> state.eventMini.date)
  console.log(dateMini)
    const localizer = dayjsLocalizer(dayjs);
      //Event state global
    const eventState = useSelector(state => state.events);
    //Events state
      const events = eventState.events;

    return (
        <div className={Styles.container}>
            <h1>Day calendar</h1>
            <Calendar
                localizer={localizer}
                views={['day']}
                defaultView={'day'}
                events={events}
                startAccessor={(event) => dayjs(event.start).toDate()}
                endAccessor={(event) => dayjs(event.end).toDate()}
                date={dateMini}
            />
        </div>
    )
}

export default DayCalendar;