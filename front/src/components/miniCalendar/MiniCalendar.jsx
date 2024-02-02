import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./miniCalendar.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { addEventMini } from "../../redux/eventMiniSlice";
import { AddMode, addSelectedEvent, addShowForm } from "../../redux/showFormSlice";
import { getEvent } from "../../redux/eventSlice";


function MiniCalendar({eventStyleGetter}) {
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

  return (

    
    <div >

      <Calendar
      localizer={localizer}
      events={events}
      views={['month']}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      eventPropGetter={eventStyleGetter}
      style={{ width: '25em', height: '25em' }}
      />

    </div>
  );
}

export default MiniCalendar;