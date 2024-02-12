import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./myCalendar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getEvent, getEvents } from "../../redux/eventSlice";
import { addShowForm } from "../../redux/showFormSlice";
import EventForm from "../eventForm/EventForm";



function MyCalendar({eventStyleGetter,handleSelectEvent, handleShowForm, handleCloseForm}) {

  const dispatch = useDispatch();
  const localizer = dayjsLocalizer(dayjs);
  const eventState = useSelector((state) => state.events);
  const events = eventState.events;
  const { showForm, selectedEvent, mode } = useSelector(state => state.showForm);

  // cierra el formuario cuando crea el componente
  useEffect(()=>{
    dispatch(addShowForm(false))
  },[])

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    
    <div className={styles.container}>
    <div className={styles.maxWidthContainer}>
      <div style={{ padding: '1rem 2rem' }}>
    <Calendar
                        localizer={localizer}
                        events={events}
                        onSelectEvent={handleSelectEvent}
                        selectable
                        startAccessor={(event) => dayjs(event.start).toDate()}
                        endAccessor={(event) => dayjs(event.end).toDate()}
                        onSelectSlot={handleShowForm}
                        style={{ width: "90%", height: "77vh", fontSize: "1.2rem", margin: "1rem" }}
                        eventPropGetter={eventStyleGetter}
                    />
      </div>
      </div>

      {showForm && (
        <EventForm
          mode={mode}
          event={selectedEvent}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default MyCalendar;