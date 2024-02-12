import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import styles from "./miniCalendar.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { addEventMini } from "../../redux/eventMiniSlice";
import { AddMode, addSelectedEvent, addShowForm } from "../../redux/showFormSlice";
import { getEvent } from "../../redux/eventSlice";


function MiniCalendar() {
  const dispatch = useDispatch()
  const localizer = dayjsLocalizer(dayjs);
  const eventState = useSelector(state => state.events);
  const events = eventState.events;

  const handleSelectSlot = ({ start, end, slots, action, bounds, box }) => {
    const formattedDate = start.toISOString();
    dispatch(addEventMini(formattedDate));

  };

  const handleSelectEvent = (event, e) => {
    const formattedDate = event.start;
    dispatch(addEventMini(formattedDate));
    dispatch(getEvent(event._id)); 
    dispatch(addSelectedEvent(event));
    dispatch(AddMode('edit'));
    dispatch(addShowForm(true));
  };

  const eventStyleGetter = (event) => {
    let newStyle = {
      backgroundColor: event.color,
      color: "black",
      fontWeight: "bold",
      borderRadius: '5px',
      opacity: 0.8,
      border: '1px solid black',
      display: 'flex',
      textAlign: 'center',
      padding: '5px',
      height: '60%', // Modificar el alto del evento
      width: '90%',   // Modificar el ancho del evento
      fontSize: '10px',
      alignItems: 'center', // Centrar verticalmente
    justifyContent: 'center', // Centrar horizontalmente
    }
    return {
      style: newStyle
    }
  }

  return (

    
    <div className={styles.container}>

      <Calendar
      localizer={localizer}
      events={events}
      views={['month']}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      eventPropGetter={eventStyleGetter}
     
      />

    </div>
  );
}

export default MiniCalendar;