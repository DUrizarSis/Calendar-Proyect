import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./myCalendar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getEvent, getEvents } from "../../redux/eventSlice";


function MyCalendar() {

  const dispatch = useDispatch();
  const localizer = dayjsLocalizer(dayjs);

  //Event state global
  const eventState = useSelector(state => state.events);
  //Events state
  const events = eventState.events;
  //UserEvents state
  const onEvent = eventState.onEvent;



  //Bring the events
  useEffect(()=> {
    dispatch(getEvents());
  }, []);

  //Obtaining data from the current event
  const handleSelectEvent = (selectedEvent) => {
    dispatch(getEvent(selectedEvent._id));
  };

  return (
    <div className={Styles.container}>
      <h1>My Calendar</h1>
      <Calendar
      localizer={localizer}
      events = {events}
      onSelectEvent = {handleSelectEvent}
      startAccessor={(event) => dayjs(event.start).toDate()}
      endAccessor={(event) => dayjs(event.end).toDate()}
      />

    </div>
  );
}

export default MyCalendar;