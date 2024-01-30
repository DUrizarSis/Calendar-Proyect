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
    //   const events = eventState.events;
      const events = [
        {
          title: 'Cambio de nombre',
          start: new Date('2024-01-17T13:00'),
          end: new Date('2024-01-19T12:00'),
        },
        {
          title: 'prueba',
          start: new Date('2024-01-17T13:00'),
          end: new Date('2024-01-18T12:00'),
        },
        {
          title: 'prueba',
          start: new Date('2024-01-24T13:00'),
          end: new Date('2024-01-25T12:00'),
        },
        {
          title: 'dfgdfgdf',
          start: new Date('2024-02-01T02:15:00.000Z'),
          end: new Date('2024-02-01T02:18:00.000Z'),
        },
        // ... otros eventos
      ];
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